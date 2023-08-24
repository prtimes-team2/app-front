import * as React from 'react';
import { useQuery } from '@tanstack/react-query';

import { Confilm } from '../components/Register/Confilm';

import {
  Avatar,
  Box,
  Button,
  Container,
  FormControl,
  MenuItem,
  Modal,
  Select,
  Stack,
  Typography,
} from '@mui/material';

import { LocalizationProvider } from '@mui/x-date-pickers';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';

import { japan } from '../lib/japan';
import { getCity } from '../lib/getAddress';
import { jenderArr } from '../lib/jender';

export default function SignUp() {
  const [prefecture, setPrefecture] = React.useState<string>('');
  const [city, setCity] = React.useState('');
  const [birthday, setBirthDay] = React.useState<Date | null>(null);
  const [jender, setJender] = React.useState(0);
  const [open, setOpen] = React.useState(false);

  const prefectureLs = japan.map((value) => {
    return (
      <MenuItem key={value.id} value={value.id}>
        {value.name}
      </MenuItem>
    );
  });

  const citiesArr = useQuery(['cities', prefecture], () => getCity(prefecture));

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

  const jenderLs = jenderArr.map((obj) => {
    return (
      <MenuItem key={obj.id} value={obj.id}>
        {obj.value}
      </MenuItem>
    );
  });

  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  return (
    <Container component="main" maxWidth="xs">
      <Box
        sx={{
          marginTop: 8,
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
        }}
      >
        <Typography component="h1" variant="h5">
          ようこそ！
        </Typography>
        <Avatar sx={{ m: 1, bgcolor: 'secondary.main' }}></Avatar>

        <Box component="form" noValidate sx={{ mt: 3 }}>
          <Stack spacing={2}>
            <FormControl>
              <Select
                id="register-prefecture"
                value={prefecture}
                label="都道府県"
                onChange={({ target }) => {
                  setPrefecture(target.value);
                }}
              >
                {prefectureLs}
              </Select>
            </FormControl>

            <FormControl>
              <Select
                id="regitster-city"
                value={city}
                label="市区町村"
                onChange={({ target }) => {
                  setCity(target.value);
                }}
              >
                {cityLs}
              </Select>
            </FormControl>

            <LocalizationProvider dateAdapter={AdapterDayjs}>
              <DatePicker
                value={birthday}
                onChange={(newValue) => setBirthDay(newValue)}
              />
            </LocalizationProvider>

            <FormControl>
              <Select
                id="jender"
                value={jender}
                label="性別"
                onChange={({ target }) => {
                  setJender(Number(target.value));
                }}
              >
                {jenderLs}
              </Select>
            </FormControl>
          </Stack>

          <Button fullWidth sx={{ mt: 3 }} onClick={handleOpen}>
            登録
          </Button>

          <Modal
            open={open}
            onClose={handleClose}
            aria-labelledby="modal-modal-title"
            aria-describedby="modal-modal-description"
          >
            <Confilm
              prefecture={prefecture}
              city={city}
              birthday={birthday}
              jender={jender}
            />
          </Modal>
        </Box>
      </Box>
    </Container>
  );
}
