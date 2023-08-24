import { Close, Delete, LocationOn } from '@mui/icons-material';
import { Avatar, Box, IconButton, Paper, Typography } from '@mui/material';
import { AuthContext } from '../contexts/AuthContexts';
import { useContext } from 'react';

const Detail = () => {
  const { profile } = useContext(AuthContext);
  return (
    <>
      <Box padding={2} display={'flex'}>
        <IconButton
          sx={{ marginRight: 1 }}
          onClick={() => window.history.back()}
        >
          <Close />
        </IconButton>
        <Typography
          variant="h6"
          fontWeight={'bold'}
          display={'flex'}
          alignItems={'center'}
          justifyContent={'center'}
        >
          詳細
        </Typography>
        <IconButton sx={{ marginLeft: 'auto' }}>
          <Delete />
        </IconButton>
      </Box>
      <Box paddingLeft={5} paddingBottom={1} display={'flex'}>
        <Avatar
          alt={profile ? profile.displayName : 'no profile'}
          src={profile && profile.pictureUrl ? profile.pictureUrl : ''}
          sx={{ width: 28, height: 28, marginRight: 1 }}
        />
        <Typography
          variant="subtitle1"
          component="div"
          display={'flex'}
          alignItems={'center'}
        >
          {profile ? profile.displayName : 'no profile'}
        </Typography>
      </Box>
      <Box
        display="flex"
        justifyContent="center"
        flexDirection="column"
        alignItems="center"
        paddingBottom={1}
      >
        <Box>
          <Typography
            variant="h6"
            fontWeight="bold"
            mt={1}
            textAlign={'center'}
          >
            {/* TODO: タイトル */}
            琵琶湖の眺め
          </Typography>
        </Box>
      </Box>
      <Box display="flex" justifyContent="center">
        <Paper elevation={3} style={{ width: '80%', overflow: 'hidden' }}>
          {/* TODO: 画像を表示する */}
          <img
            src="https://source.unsplash.com/random"
            style={{ width: '100%', display: 'block' }}
          />
        </Paper>
      </Box>
      <Box
        display="flex"
        justifyContent="center"
        flexDirection="column"
        alignItems="center"
        paddingTop={0.2}
      >
        <Box>
          <Typography
            variant="subtitle1"
            fontWeight="bold"
            textAlign={'center'}
          >
            {/* TODO: サブタイトル */}
            ここから見える景色は地元民のみぞ知る
          </Typography>
        </Box>
      </Box>
      <Box paddingTop={2} paddingLeft={5} display={'flex'}>
        <LocationOn sx={{ marginRight: 1 }} />
        <Typography variant="body2" display={'flex'} alignItems={'center'}>
          滋賀県大津市
        </Typography>
      </Box>
      <Box
        paddingTop={1}
        paddingRight={5}
        display={'flex-end'}
        textAlign={'right'}
      >
        <Typography variant="body2">2023年8月24日</Typography>
      </Box>
    </>
  );
};

export default Detail;
