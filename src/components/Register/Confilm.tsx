import { useQuery } from '@tanstack/react-query';
import { Box, Button, Card, Typography } from '@mui/material';

import { japan } from '../../lib/japan';
import { getCity } from '../../lib/getAddress';
import { jenderArr } from '../../lib/jender';

interface propsType {
  prefecture: string;
  city: string;
  birthday: Date | null;
  jender: number;
}

export const Confilm = (prop: propsType) => {
  // const registInfo =  {
  //   prefecture: prop.prefecture,
  //   city: prop.city,
  //   birth: prop.birthday,
  //   jender: prop.jender
  // }

  const prefecture = japan.find((obj) => (obj.id = prop.prefecture));

  const cityArr = useQuery(['data'], () => getCity(prop.prefecture));

  let city;
  if (cityArr && cityArr.data && cityArr.data.data) {
    city = cityArr.data.data.find(
      (obj: { id: string }) => obj.id === prop.city
    );
  }

  const jender = jenderArr[prop.jender].value;

  let japaneseDate;
  if (prop.birthday) {
    japaneseDate = `${new Date(prop.birthday).getFullYear()}年${
      new Date(prop.birthday).getMonth() + 1
    }月${new Date(prop.birthday).getDate()}日`;
  }

  return (
    <Card>
      <Box>
        <Typography>
          本当によろしいですか？ ※地元は後から変更することができません
        </Typography>
        <Box>
          <Typography>{prefecture?.name}</Typography>
          <Typography>{city?.name}</Typography>
          <Typography>{japaneseDate}</Typography>
          <Typography>{jender}</Typography>
        </Box>
        <Button
          fullWidth
          // onSubmit={}
        >
          登録
        </Button>
      </Box>
    </Card>
  );
};
