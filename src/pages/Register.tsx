import * as React from 'react';
import { useQuery } from '@tanstack/react-query';

import { Confirm } from '../components/Register/Confirm';

import {
  Avatar,
  Box,
  Button,
  Container,
  FormControl,
  InputLabel,
  MenuItem,
  Modal,
  Select,
  Stack,
  Typography,
} from '@mui/material';

import { LocalizationProvider } from '@mui/x-date-pickers';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import 'dayjs/locale/ja';
import LoginIcon from '@mui/icons-material/Login';

import { japan } from '../lib/japan';
import { getAddress } from '../lib/getAddress';
import { jenderArr } from '../lib/jender';
import { useContext, useState } from 'react';
import { AuthContext } from '../contexts/AuthContexts';

export default function SignUp() {
  const [prefecture, setPrefecture] = useState<string>('');
  const [city, setCity] = useState<string>('');
  const [birthday, setBirthDay] = useState<Date | null>(null);
  const [jender, setJender] = useState<number>(2);
  const [open, setOpen] = useState<boolean>(false);
  const { profile } = useContext(AuthContext);

  const prefectureLs = japan.map((value) => {
    return (
      <MenuItem key={value.name} value={value.name}>
        {value.name}
      </MenuItem>
    );
  });

  const citiesArr = useQuery(['cities', prefecture], () =>
    getAddress.getCitiesArr(getAddress.getPrefId(prefecture))
  );

  let cityLs;
  if (citiesArr && citiesArr.data) {
    cityLs = citiesArr.data.map((value: { id: string; name: string }) => {
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
        <Typography
          component="h1"
          variant="h5"
          fontWeight={'bold'}
          pb={1}
          letterSpacing={2}
        >
          じもとコイン
        </Typography>
        <Typography component="h2" variant="h5" pb={2}>
          へようこそ！
        </Typography>
        <Avatar
          alt={profile ? profile.displayName : 'no profile'}
          src={profile && profile.pictureUrl ? profile.pictureUrl : ''}
          sx={{ width: 56, height: 56, marginRight: 2 }}
        />

        <Box component="form" noValidate sx={{ mt: 3 }}>
          <Stack spacing={2}>
            <FormControl
              sx={{
                width: '100%',
                minWidth: 120,
              }}
            >
              <InputLabel id="register-prefecture-label">都道府県</InputLabel>
              <Select
                labelId="register-prefecture-label"
                id="register-prefecture"
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
            {prefecture !== '' ? (
              <FormControl>
                <InputLabel id="register-city-label">市区町村</InputLabel>
                <Select
                  id="regitster-city"
                  labelId="register-city-label"
                  value={city}
                  onChange={({ target }) => {
                    setCity(target.value);
                  }}
                >
                  {cityLs}
                </Select>
              </FormControl>
            ) : (
              <FormControl disabled>
                <InputLabel id="register-city-label">市区町村</InputLabel>
                <Select
                  id="regitster-city"
                  labelId="register-city-label"
                  value={city}
                  onChange={({ target }) => {
                    setCity(target.value);
                  }}
                >
                  {cityLs}
                </Select>
              </FormControl>
            )}
            <LocalizationProvider dateAdapter={AdapterDayjs}>
              <DatePicker
                label="生年月日"
                format="YYYY/MM/DD"
                value={birthday}
                onChange={(newValue) => setBirthDay(newValue)}
              />
            </LocalizationProvider>
            <FormControl>
              <InputLabel id="jender-label">性別</InputLabel>
              <Select
                id="jender"
                labelId="jender-label"
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
          <Box
            sx={{
              marginTop: 8,
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
            }}
          >
            {prefecture !== '' &&
            city !== '' &&
            birthday !== null &&
            jender !== null ? (
              <Button
                variant="contained"
                startIcon={<LoginIcon />}
                onClick={handleOpen}
                sx={{
                  borderRadius: 50,
                  paddingX: 3,
                  paddingY: 1,
                }}
              >
                新規登録
              </Button>
            ) : (
              <Button
                disabled
                variant="contained"
                startIcon={<LoginIcon />}
                onClick={handleOpen}
                sx={{
                  borderRadius: 50,
                  paddingX: 3,
                  paddingY: 1,
                }}
              >
                新規登録
              </Button>
            )}
          </Box>

          <Modal
            open={open}
            onClose={handleClose}
            aria-labelledby="modal-modal-title"
            aria-describedby="modal-modal-description"
          >
            <Confirm
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
