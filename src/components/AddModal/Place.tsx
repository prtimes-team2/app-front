import liff from '@line/liff';
import SendIcon from '@mui/icons-material/Send';
import { Box, Button, Container, Stack, TextField } from '@mui/material';
import { useCallback, useContext, useState } from 'react';
import { AuthContext } from '../../contexts/AuthContexts';
import { uploadImage } from '../../useFirebaseClient';
import { ImageInput } from './ImageInput';

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
        width: '25ch',
        display: 'flex',
        alignContent: 'center',
        alignItems: 'center',
      }}
    >
      <Stack spacing={2}>
        <TextField
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
        <Button
          variant="outlined"
          endIcon={<SendIcon />}
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
