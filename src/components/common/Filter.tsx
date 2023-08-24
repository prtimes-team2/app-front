import * as React from 'react';
import { useQuery } from '@tanstack/react-query';

import { AuthContext } from '../../contexts/AuthContexts';

import {
  Box,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Container,
  Typography,
} from '@mui/material';

import { japan } from '../../lib/japan';
import { getCity } from '../../lib/getAddress';
import { User } from '../../types/user';

interface propsType {
  filterKey: string;
  setAddress: React.Dispatch<React.SetStateAction<string>>;
}

const getStringPrefecture = (prefId: string) => {
  const result = japan.filter((value) => value.id === prefId);

  if (result.length > 0) {
    return result[0].name;
  }

  return '';
};

export const Filter = (prop: propsType) => {
  const { user } = React.useContext(AuthContext);
  if (user === null) return null;

  return <Inner {...prop} user={user} />;
};

const Inner = (prop: propsType & { user: User }) => {
  const { user } = prop;

  const [prefecture, setPrefecture] = React.useState(user.prefecture);
  const [city, setCity] = React.useState(user.city);

  const prefectureLs = japan.map((value) => {
    return (
      <MenuItem key={prop.filterKey + value.id} value={value.id}>
        {value.name}
      </MenuItem>
    );
  });

  const citiesArr = useQuery(['cities', prefecture], () => getCity(prefecture));

  let cityLs, stringCity: { name: string };
  if (citiesArr && citiesArr.data && citiesArr.data.data) {
    stringCity = citiesArr.data.data.find(
      (obj: { id: string }) => obj.id === city
    );

    cityLs = citiesArr.data.data.map((value: { id: string; name: string }) => {
      return (
        <MenuItem key={prop.filterKey + value.id} value={value.id}>
          {value.name}
        </MenuItem>
      );
    });
  }

  React.useEffect(() => {
    if (!city) {
      return;
    }

    prop.setAddress(getStringPrefecture(prefecture) + stringCity?.name);
  }, [city, citiesArr]);

  return (
    <Container
      maxWidth="sm"
      sx={{ display: 'flex', justifyContent: 'flex-end' }}
    >
      <Box sx={{ mr: 1, minWidth: '20%' }}>
        <FormControl fullWidth size="small">
          <InputLabel id="prefecture-label">都道府県</InputLabel>
          <Select
            labelId="prefecture-label"
            id={prop.filterKey + '-prefecture'}
            value={prefecture}
            label="都道府県"
            onChange={({ target }) => {
              setPrefecture(target.value);
              setCity('');
            }}
          >
            {prefectureLs}
          </Select>
        </FormControl>
      </Box>
      <Box
        sx={{ mr: 1, minWidth: '5%' }}
        display="flex"
        alignItems="center"
        justifyContent={'center'}
      >
        <Typography variant="body1">の</Typography>
      </Box>
      <Box sx={{ mr: 1, minWidth: '20%' }}>
        <FormControl fullWidth size="small">
          <InputLabel id="city-label">市区町村</InputLabel>
          <Select
            labelId="city-label"
            id={prop.filterKey + '-city'}
            value={city}
            label="市区町村"
            onChange={({ target }) => {
              setCity(target.value);
            }}
          >
            {cityLs}
          </Select>
        </FormControl>
      </Box>
    </Container>
  );
};
