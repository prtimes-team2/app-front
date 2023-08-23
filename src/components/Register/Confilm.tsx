import { Box, Button, Card, Typography } from '@mui/material';

import { japan } from '../../lib/japan';
import { jenderArr } from '../../lib/jender';

interface propsType {
  prefecture: number;
  city: number;
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

  const prefecture = japan[prop.prefecture - 1].name;
  console.log(prefecture);

  const cityArr = japan[prop.prefecture - 1].city;
  const city = cityArr[prop.city - 1].name;

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
          <Typography>{prefecture}</Typography>
          <Typography>{city}</Typography>
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
