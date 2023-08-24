import { useQuery } from '@tanstack/react-query';

import { FormControl, Select, MenuItem, Grid } from '@mui/material';

import { japan } from '../../lib/japan';
import { getCity } from '../../lib/getAddress';
import { Dispatch, SetStateAction } from 'react';

interface propsType {
  prefecture: string;
  setPrefecture: Dispatch<SetStateAction<string>>;
  city: string;
  setCity: Dispatch<SetStateAction<string>>;
}

export const Filter = (prop: propsType) => {
  const prefectureLs = japan.map((value) => {
    return (
      <MenuItem key={value.id} value={value.id}>
        {value.name}
      </MenuItem>
    );
  });

  const citiesArr = useQuery(['cities', prop.prefecture], () =>
    getCity(prop.prefecture)
  );

  let cityLs;
  if (citiesArr && citiesArr.data && citiesArr.data.data) {
    cityLs = citiesArr.data.data.map((value: { id: string; name: string }) => {
      return (
        <MenuItem key={value.id} value={value.id}>
          {value.name}
        </MenuItem>
      );
    });
  }

  return (
    <Grid>
      <FormControl>
        <Select
          value={prop.prefecture}
          label="都道府県"
          onChange={({ target }) => {
            prop.setPrefecture(target.value);
          }}
        >
          {prefectureLs}
        </Select>
      </FormControl>
      <FormControl>
        <Select
          value={prop.city}
          label="市区町村"
          onChange={({ target }) => {
            prop.setCity(target.value);
          }}
        >
          {cityLs}
        </Select>
      </FormControl>
    </Grid>
  );
};
