import { Close, Delete, LocationOn } from '@mui/icons-material';
import {
  Avatar,
  Box,
  IconButton,
  Paper,
  Skeleton,
  Typography,
} from '@mui/material';
import { useContext } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { AuthContext } from '../contexts/AuthContexts';

const Detail = () => {
  const navigate = useNavigate();
  const pathname = useLocation().pathname;
  const reportId = Number(pathname.split('/')[3]);
  const { profile, reports } = useContext(AuthContext);
  const report = reports.find((report) => report.id === reportId);
  const postDay = report?.created_at.split('T')[0];

  const handleDelete = async () => {
    if (window.confirm('削除しますか？')) {
      console.log(reportId);

      // api
      // APIにリクエスト

      const baseUrl = process.env.REACT_APP_API_BASE_URL;
      if (!baseUrl) {
        console.log('baseUrl is undefined');
        return;
      }
      const options = {
        method: 'DELETE',
      };

      const requestUrl =
        baseUrl + '/report' + `?idToken=id_token&reportId=${reportId}`;

      console.log(requestUrl, 'requestUrl');

      const res = await fetch(requestUrl, options);
      const resData = await res.json();
      console.log(resData);

      // /app/homeに遷移する
      navigate('/app/home');
    }
  };
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
        {/* 削除ボタンは自分が投稿したものだけ表示される */}
        {profile && report && profile.userId === report.user_id ? (
          <IconButton
            sx={{ marginLeft: 'auto' }}
            onClick={() => handleDelete()}
          >
            <Delete />
          </IconButton>
        ) : (
          <></>
        )}
      </Box>
      <Box paddingLeft={5} paddingBottom={1} display={'flex'}>
        <Avatar
          alt={profile ? profile.displayName : 'no profile'}
          src={profile && profile.pictureUrl ? profile.pictureUrl : ''}
          sx={{ width: 28, height: 28, marginRight: 1 }}
        />
        <Box sx={{ width: '100%' }}>
          {report ? (
            <Typography
              variant="subtitle1"
              component="div"
              display={'flex'}
              alignItems={'center'}
            >
              {profile ? profile.displayName : 'no profile'}
            </Typography>
          ) : (
            <Skeleton width="10vh" animation="wave">
              <Typography>.</Typography>
            </Skeleton>
          )}
        </Box>
      </Box>
      <Box
        display="flex"
        justifyContent="center"
        flexDirection="column"
        alignItems="center"
        paddingBottom={1}
      >
        <Box>
          <Box sx={{ width: '100%' }}>
            {report ? (
              <Typography
                variant="h6"
                fontWeight="bold"
                mt={1}
                textAlign={'center'}
              >
                {report.title}
              </Typography>
            ) : (
              <Skeleton width="10vh" animation="wave">
                <Typography>.</Typography>
              </Skeleton>
            )}
          </Box>
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
          <Box sx={{ width: '100%' }}>
            {report ? (
              <Typography
                variant="subtitle1"
                fontWeight="bold"
                textAlign={'center'}
              >
                {report.content}
              </Typography>
            ) : (
              <Skeleton width="10vh" animation="wave">
                <Typography>.</Typography>
              </Skeleton>
            )}
          </Box>
        </Box>
      </Box>
      <Box paddingTop={2} paddingLeft={5} display={'flex'}>
        <LocationOn sx={{ marginRight: 1 }} />
        <Box sx={{ width: '100%' }}>
          {report ? (
            <Typography variant="body2" display={'flex'} alignItems={'center'}>
              {report.address}
            </Typography>
          ) : (
            <Skeleton width="10vh" animation="wave">
              <Typography>.</Typography>
            </Skeleton>
          )}
        </Box>
      </Box>
      <Box
        paddingTop={1}
        paddingRight={5}
        display={'flex-end'}
        textAlign={'right'}
      >
        {report ? (
          <Typography variant="body2">{postDay}</Typography>
        ) : (
          <Skeleton animation="wave">
            <Typography variant="body2">.</Typography>
          </Skeleton>
        )}
      </Box>
    </>
  );
};

export default Detail;
