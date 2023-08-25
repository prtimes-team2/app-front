import 'mapbox-gl/dist/mapbox-gl.css';
import { useContext, useEffect, useMemo, useRef, useState } from 'react';
import Map, {
  // CircleLayer,
  GeolocateControl,
  Marker,
  Popup,
} from 'react-map-gl';
import { AddFab } from '../components/common/AddFab';
import Pin from '../components/Map/pin';

import MapboxLanguage from '@mapbox/mapbox-gl-language';
import { useNavigate } from 'react-router-dom';

import { AuthContext } from '../contexts/AuthContexts';

import { Loading } from '../components/Loading';
import { Report } from '../types/report';

import mapboxgl from 'mapbox-gl';
// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-ignore
mapboxgl.workerClass =
  // eslint-disable-next-line @typescript-eslint/no-var-requires
  require('worker-loader!mapbox-gl/dist/mapbox-gl-csp-worker').default;

const AppMap = () => {
  const navigate = useNavigate();
  const { reports } = useContext(AuthContext);
  const map = useRef(null);
  const geoControlRef = useRef();

  const mapToken = process.env.REACT_APP_MAPBOX_TOKEN;

  if (!mapToken) {
    throw new Error('Mapbox Token is not defined');
  }
  // 現在地の取得
  const [viewport, setViewport] = useState({
    latitude: 35.681236,
    longitude: 139.767125,
  });

  useEffect(() => {
    navigator.geolocation.getCurrentPosition(
      (pos) => {
        console.log(pos);
        setViewport({
          latitude: pos.coords.latitude,
          longitude: pos.coords.longitude,
        });
      },
      (err) => {
        console.log(err);
        // 現在地が取れない時は東京駅の緯度軽度を入れる
        setViewport({
          latitude: 35.681236,
          longitude: 139.767125,
        }),
          console.log(err);
      }
    );
  }, []);

  useEffect(() => {
    // Activate as soon as the control is loaded
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore
    geoControlRef.current?.trigger();
  }, [geoControlRef.current]);

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

  const [popupInfo, setPopupInfo] = useState<Report | null>(null);

  const pins = useMemo(
    () =>
      reports.map((report: Report, index: number) => (
        <Marker
          key={`marker-${index}`}
          longitude={report.lng}
          latitude={report.lat}
          anchor="bottom"
          onClick={(e) => {
            // If we let the click event propagates to the map, it will immediately close the popup
            // with `closeOnClick: true`
            e.originalEvent.stopPropagation();
            setPopupInfo(report);
          }}
        >
          <Pin />
        </Marker>
      )),
    []
  );

  return (
    <div className="App">
      <header className="App-header">
        {viewport.latitude !== 0 && viewport.longitude !== 0 ? (
          <Map
            ref={map}
            mapboxAccessToken={mapToken}
            initialViewState={{
              longitude: viewport.longitude,
              latitude: viewport.latitude,
              zoom: 14,
            }}
            style={{ width: '100vw', height: 'calc(100vh - 56px)' }}
            mapStyle="mapbox://styles/mapbox/streets-v11"
            onLoad={() => onLoadMap}
          >
            {/* eslint-disable-next-line @typescript-eslint/ban-ts-comment */}
            {/* @ts-ignore */}
            <GeolocateControl ref={geoControlRef} />

            {pins}

            {popupInfo && (
              <Popup
                anchor="top"
                longitude={Number(popupInfo.lng)}
                latitude={Number(popupInfo.lat)}
                onClose={() => setPopupInfo(null)}
              >
                <div>
                  {popupInfo.id}, {popupInfo.content} |{' '}
                  <button
                    onClick={() => navigate(`/app/detail/${popupInfo.id}`)}
                  >
                    詳細を見る
                  </button>
                </div>
                {/*  eslint-disable-next-line @typescript-eslint/ban-ts-comment */}
                {/* @ts-ignore */}
                <img width="100%" src={'https://source.unsplash.com/random'} />
              </Popup>
            )}
          </Map>
        ) : (
          <div>
            <Loading />
          </div>
        )}
      </header>
      <AddFab />
    </div>
  );
};

export default AppMap;
