import liff from '@line/liff';
import LocationOnIcon from '@mui/icons-material/LocationOn';
import SendIcon from '@mui/icons-material/Send';
import {
  Box,
  Button,
  CircularProgress,
  Container,
  Stack,
  TextField,
} from '@mui/material';
import { useCallback, useContext, useEffect, useRef, useState } from 'react';
import { AuthContext } from '../../contexts/AuthContexts';
import { uploadImage } from '../../useFirebaseClient';
import { ImageInput } from './ImageInput';

import 'mapbox-gl/dist/mapbox-gl.css';
import Map, { Marker } from 'react-map-gl';

import MapboxLanguage from '@mapbox/mapbox-gl-language';

interface Props {
  handleResult: (value: boolean, amount: number) => void;
}

// 画像アップロード
export const Place = (prop: Props) => {
  const { user } = useContext(AuthContext);
  const [title, setTitle] = useState('');
  const [subTitle, setSubTitle] = useState('');
  const [hasTitleError, setHasTitleError] = useState(false);
  const [hasSubTitleError, setHasSubTitleError] = useState(false);
  const [imageData, setImageData] = useState<File>();
  const [localImage, setLocalImage] = useState<string>();
  const [loading, setLoading] = useState(false);
  const map = useRef(null);
  const markerRef = useRef(null);

  const mapToken = process.env.REACT_APP_MAPBOX_TOKEN;

  if (!mapToken) {
    throw new Error('Mapbox Token is not defined');
  }
  // 現在地の取得
  const [viewport, setViewport] = useState({
    latitude: 35.681236,
    longitude: 139.767125,
  });

  const [marker, setMarker] = useState({
    latitude: 37.7749,
    longitude: -122.4194,
    offsetLeft: -10,
    offsetTop: -10,
  });

  // eslint-disable-next-line @typescript-eslint/ban-ts-comment
  // @ts-ignore
  const onMarkerDragEnd = (event) => {
    const lngLat = event.target.getLngLat();
    setMarker({
      offsetLeft: -10,
      offsetTop: -10,
      longitude: lngLat.lng,
      latitude: lngLat.lat,
    });
  };

  useEffect(() => {
    navigator.geolocation.getCurrentPosition(
      (pos) => {
        console.log(pos);
        setViewport({
          latitude: pos.coords.latitude,
          longitude: pos.coords.longitude,
        });
        setMarker({
          offsetLeft: -10,
          offsetTop: -10,
          longitude: pos.coords.longitude,
          latitude: pos.coords.latitude,
        });
      },
      (err) => {
        console.log(err);
        // 現在地が取れない時は東京駅の緯度軽度を入れる
        setViewport({
          latitude: 35.681236,
          longitude: 139.767125,
        }),
          setMarker({
            offsetLeft: -10,
            offsetTop: -10,
            longitude: 139.767125,
            latitude: 35.681236,
          });
        console.log(err);
      }
    );
  }, []);

  // eslint-disable-next-line @typescript-eslint/ban-ts-comment
  // @ts-ignore
  function onLoadMap(e) {
    const map = e?.target;
    if (map) {
      // 言語設定
      const language = new MapboxLanguage();
      map.addControl(language);
    }
  }

  function handleFileChange(id: number) {
    return (file: File) => {
      console.log('変更されました', id);
      setImageData(file);
      setLocalImage(URL.createObjectURL(file));
    };
  }
  const inputTitle = useCallback(
    (event: React.ChangeEvent<HTMLInputElement>) => {
      const inputValue = event.target.value;
      const isEmpty = inputValue === '';
      setTitle(inputValue);
      setHasTitleError(isEmpty);
    },
    [setTitle, setHasTitleError]
  );

  const inputSubTitle = useCallback(
    (event: React.ChangeEvent<HTMLInputElement>) => {
      const inputValue = event.target.value;

      const isEmpty = inputValue === '';
      setSubTitle(inputValue);
      setHasSubTitleError(isEmpty);
    },
    [setSubTitle, setHasSubTitleError]
  );

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);

    console.log(`Sybmit Title: ${title}`);
    console.log(`Sybmit SubTitle: ${subTitle}`);

    // 地元が登録されてない
    if (!user?.prefecture || !user?.city) {
      console.log('pref', user?.prefecture);
      console.log('city', user?.city);
      console.log('error: 地元が登録されていません');
      return;
    }

    let uploadImageUrl = '';
    if (imageData) {
      // 画像データをアップロードしてURLに変更する
      const url = await uploadImage(imageData, 'test');
      uploadImageUrl = url;
    }

    const baseUrl = process.env.REACT_APP_API_BASE_URL;
    if (!baseUrl) {
      console.log('baseUrl is undefined');
      return;
    }

    // APIにリクエスト
    const options = {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        idToken: liff.getIDToken() ?? 'id_token',
        title,
        content: subTitle,
        address: user.prefecture + user.city,
        // 地図UIで選択させる
        lat: 34.976944,
        lng: 38.383056,
        urls: [uploadImageUrl ?? null],
        tags: [],
      }),
    };

    const res = await fetch(baseUrl + '/report', options);
    const resData = (await res.json()) as { amount: number };
    console.log(resData);

    setLoading(false);
    prop.handleResult(true, resData.amount);
  };

  // isResultを使ってモーダルに表示する内容を変える
  return (
    <Stack
      component="form"
      noValidate
      onSubmit={handleSubmit}
      spacing={2}
      sx={{
        m: 2,
        width: '100%',
        display: 'flex',
        alignContent: 'center',
        alignItems: 'center',
      }}
    >
      <Stack spacing={2}>
        <TextField
          disabled={loading}
          sx={{ width: '100%' }}
          type="text"
          label="タイトル"
          required
          value={title}
          error={hasTitleError}
          onChange={inputTitle}
          helperText={hasTitleError ? 'タイトルを入力してください。' : ''}
        />
        <TextField
          disabled={loading}
          sx={{ width: '100%' }}
          type="text"
          label="サブタイトル"
          required
          value={subTitle}
          error={hasSubTitleError}
          onChange={inputSubTitle}
          helperText={
            hasSubTitleError ? 'サブタイトルを入力してください。' : ''
          }
        />
        <Container>
          <Box display="flex" justifyContent="space-between">
            <ImageInput url={localImage ?? ''} onChange={handleFileChange(1)} />
            {/* <ImageInput url={localImageArray[1]} onChange={handleFileChange(2)} id={2}/>
          <ImageInput url={localImageArray[2]} onChange={handleFileChange(3)} id={3}/> */}
          </Box>
        </Container>
        {/* mapを持ってくる */}
        {viewport.latitude !== 0 && viewport.longitude !== 0 ? (
          <Map
            ref={map}
            mapboxAccessToken={mapToken}
            initialViewState={{
              longitude: viewport.longitude,
              latitude: viewport.latitude,
              zoom: 14,
            }}
            style={{ width: '100%', height: '450px' }}
            mapStyle="mapbox://styles/mapbox/streets-v11"
            onLoad={() => onLoadMap}
          >
            <Marker
              ref={markerRef}
              latitude={marker.latitude}
              longitude={marker.longitude}
              draggable
              onDragEnd={onMarkerDragEnd}
            >
              <LocationOnIcon sx={{ color: 'blue', fontSize: 40 }} />
            </Marker>
          </Map>
        ) : null}
        <Button
          disabled={loading}
          variant="outlined"
          endIcon={!loading ? <SendIcon /> : <CircularProgress />}
          type="submit"
          sx={{
            borderRadius: 2,
            width: '75%',
          }}
        >
          投稿
        </Button>
      </Stack>
    </Stack>
  );
};
