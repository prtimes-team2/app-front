import { useQuery } from '@tanstack/react-query';

import { Box, Button, Card, Typography } from '@mui/material';

import { getCity } from '../../lib/getAddress';
import { japan } from '../../lib/japan';
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
  const prefecture = japan.find((obj) => (obj.id = prop.prefecture));

  const cityArr = useQuery(['data'], () => getCity(prop.prefecture));

  // eslint-disable-next-line @typescript-eslint/ban-ts-comment
  // @ts-ignore
  let city: { id: string; name: string } | undefined;
  if (cityArr && cityArr.data && cityArr.data.data) {
    city = cityArr.data.data.find(
      (obj: { id: string }) => obj.id === prop.city
    );
  }

  const jender = jenderArr[prop.jender].value;

  let japaneseDate = '';
  if (prop.birthday) {
    japaneseDate = `${new Date(prop.birthday).getFullYear()}年${
      new Date(prop.birthday).getMonth() + 1
    }月${new Date(prop.birthday).getDate()}日`;
  }

  const submit = () => {
    console.log('submit');
    console.log(prop.birthday, 'prop.birthday');
    console.log(japaneseDate, 'japaneseDate');
    console.log(jender, 'jender');
    if (!city) {
      throw new Error('city is undefined');
    }
    if (!prefecture) {
      throw new Error('prefecture is undefined');
    }
    console.log(city, 'city');
    console.log(prefecture, 'prefecture');

    // APIに送信
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
              {prefecture?.name}
            </Typography>
          </Box>
          <Box sx={{ display: 'flex' }} alignItems={'flex-end'} pb={1}>
            <Typography variant="subtitle1">地元の市：</Typography>
            <Typography variant="subtitle1" fontWeight={'bold'}>
              {city?.name}
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
              {jender}
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
