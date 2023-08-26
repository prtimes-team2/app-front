import liff from '@line/liff';
import { Box, Button, Card, Typography } from '@mui/material';

import { useNavigate } from 'react-router-dom';
import { jenderArr } from '../../lib/jender';

interface propsType {
  prefecture: string;
  city: string;
  birthday: Date | null;
  jender: number;
}

const style = {
  position: 'absolute' as const,
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: '75vw',
  bgcolor: 'background.paper',
  borderRadius: '0.5rem',
  boxShadow: 24,
  p: 4,
};

export const Confirm = (prop: propsType) => {
  const navigate = useNavigate();

  const jender = jenderArr[prop.jender];

  let japaneseDate = '';
  if (prop.birthday) {
    japaneseDate = `${new Date(prop.birthday).getFullYear()}年${
      new Date(prop.birthday).getMonth() + 1
    }月${new Date(prop.birthday).getDate()}日`;
  }

  const submit = async () => {
    console.log('submit');
    console.log(prop.birthday, 'prop.birthday');
    console.log(jender, 'jender');

    if (!prop.city) {
      throw new Error('city is undefined');
    }
    if (!prop.prefecture) {
      throw new Error('prefecture is undefined');
    }
    if (!prop.birthday) {
      throw new Error('birthday is undefined');
    }

    console.log(prop.city, 'city');
    console.log(prop.prefecture, 'prefecture');

    const inputDate = `${new Date(prop.birthday).getFullYear()}-${
      new Date(prop.birthday).getMonth() + 1
    }-${new Date(prop.birthday).getDate()}`;

    console.log(inputDate, 'inputDate');

    // APIに送信

    const baseUrl = process.env.REACT_APP_API_BASE_URL;
    if (!baseUrl) {
      console.log('baseUrl is undefined');
      return;
    }

    // APIにリクエスト
    const options = {
      method: 'PUT',
    };

    const requestUrl =
      baseUrl +
      '/user' +
      `?idToken=${liff.getIDToken() ?? 'id_token'}&gender=${jender.id}&city=${
        prop.city
      }&prefecture=${prop.prefecture}&birth=${inputDate}`;

    console.log(requestUrl, 'requestUrl');

    const res = await fetch(requestUrl, options);
    const resData = await res.json();
    console.log(resData);

    // /app/homeに遷移
    navigate('/app/home');
  };

  return (
    <Card>
      <Box sx={style}>
        <Box
          sx={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
          }}
        >
          <Typography variant="h6" fontWeight={'bold'}>
            本当によろしいですか？
          </Typography>
          <Typography variant="body2" pb={2}>
            ※地元は後から変更することができません
          </Typography>
        </Box>
        <Box pl={1}>
          <Box sx={{ display: 'flex' }} alignItems={'flex-end'} pb={1}>
            <Typography variant="subtitle1">地元の県：</Typography>
            <Typography variant="subtitle1" fontWeight={'bold'}>
              {prop.prefecture}
            </Typography>
          </Box>
          <Box sx={{ display: 'flex' }} alignItems={'flex-end'} pb={1}>
            <Typography variant="subtitle1">地元の市：</Typography>
            <Typography variant="subtitle1" fontWeight={'bold'}>
              {prop.city}
            </Typography>
          </Box>
          <Box sx={{ display: 'flex' }} alignItems={'flex-end'} pb={1}>
            <Typography variant="subtitle1">誕生日：</Typography>
            <Typography variant="subtitle1" fontWeight={'bold'}>
              {japaneseDate}
            </Typography>
          </Box>
          <Box sx={{ display: 'flex' }} alignItems={'flex-end'} pb={2}>
            <Typography variant="subtitle1">性別：</Typography>
            <Typography variant="subtitle1" fontWeight={'bold'}>
              {jender.value}
            </Typography>
          </Box>
        </Box>
        <Box
          sx={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
          }}
        >
          <Button
            variant="outlined"
            sx={{
              borderRadius: 50,
              paddingX: 3,
              paddingY: 1,
            }}
            onClick={submit}
          >
            <Typography variant="subtitle1" fontWeight={'bold'}>
              登録する
            </Typography>
          </Button>
        </Box>
      </Box>
    </Card>
  );
};
