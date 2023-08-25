import liff from '@line/liff';
import PlaceIcon from '@mui/icons-material/Place';
import {
  Box,
  Card,
  CardActionArea,
  CardContent,
  CardMedia,
  IconButton,
  Skeleton,
  Typography,
} from '@mui/material';
import { useNavigate } from 'react-router-dom';

import { useContext, useEffect, useState } from 'react';
import { AuthContext } from '../../contexts/AuthContexts';

interface propsType {
  postKey: number;
  image: string;
  title: string;
  detail: string;
  address: string;
  isFavorite: boolean;
  userId: string;
}

const FavoriteIconBk = () => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
    >
      <path
        d="M21 8.25C21 5.765 18.901 3.75 16.312 3.75C14.377 3.75 12.715 4.876 12 6.483C11.285 4.876 9.623 3.75 7.687 3.75C5.1 3.75 3 5.765 3 8.25C3 15.47 12 20.25 12 20.25C12 20.25 21 15.47 21 8.25Z"
        fill="#E97575"
        stroke="black"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
};

const FavoriteIconRed = () => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
    >
      <path
        d="M21 8.25C21 5.765 18.901 3.75 16.312 3.75C14.377 3.75 12.715 4.876 12 6.483C11.285 4.876 9.623 3.75 7.687 3.75C5.1 3.75 3 5.765 3 8.25C3 15.47 12 20.25 12 20.25C12 20.25 21 15.47 21 8.25Z"
        stroke="black"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
};

export const MainCard = (props: propsType) => {
  const { setFavorite } = useContext(AuthContext);
  const navigate = useNavigate();

  const setLiked = async (newValue: boolean) => {
    // apiにpostする
    const baseUrl = process.env.REACT_APP_API_BASE_URL;
    if (!baseUrl) {
      console.log('baseUrl is undefined');
      return;
    }

    // APIにリクエスト
    const options = {
      method: newValue ? 'POST' : 'DELETE',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        idToken: liff.getIDToken() ?? 'id_token',
        reportId: props.postKey,
      }),
    };

    const res = await fetch(baseUrl + '/favorite', options);
    const resData = await res.json();
    console.log(resData);

    console.log(props.address);
    // いいねの状態を更新
    setFavorite(newValue, props.postKey);
  };

  const [showSkeleton, setShowSkeleton] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setShowSkeleton(false);
    }, 1000);

    return () => {
      clearTimeout(timer); // クリーンアップ関数として、コンポーネントのアンマウント時にタイマーをクリア
    };
  }, []);

  return (
    <Box marginBottom={1}>
      <Card
        sx={{
          display: 'flex',
          borderBottomLeftRadius: 0,
          borderBottomRightRadius: 0,
        }}
      >
        <CardActionArea
          sx={{ flex: '1', display: 'flex' }}
          onClick={() => {
            if (props.address === 'PR TIMES') {
              window.open(`${props.userId}`, '_blank');
            } else {
              navigate('/app/detail/' + props.postKey);
            }
          }}
        >
          {showSkeleton ? (
            <Skeleton
              variant="rectangular"
              animation="wave"
              sx={{
                height: 96,
                width: 96,
                minWidth: 96,
                objectFit: 'cover',
                padding: 1,
              }}
            >
              <Typography>.</Typography>
            </Skeleton>
          ) : (
            <CardMedia
              image={
                props.image ? props.image : 'https://source.unsplash.com/random'
              }
              title="画像"
              sx={{
                height: 96,
                width: 96,
                minWidth: 96,
                objectFit: 'cover',
                padding: 1,
              }}
            />
          )}
          <Box sx={{ flex: '1' }} position={'relative'} overflow={'hidden'}>
            <CardContent>
              <Typography
                component="div"
                variant="h6"
                width={'100%'}
                sx={{
                  whiteSpace: 'nowrap',
                  textOverflow: 'ellipsis',
                  overflow: 'hidden',
                }}
              >
                {props.title}
              </Typography>
              <Typography
                noWrap={true}
                component="div"
                width={'100%'}
                sx={{
                  whiteSpace: 'nowrap',
                  textOverflow: 'ellipsis',
                  overflow: 'hidden',
                }}
              >
                {props.detail}
              </Typography>
              {/* ハートアイコン */}
            </CardContent>
          </Box>
        </CardActionArea>
      </Card>
      <Card
        sx={{
          display: 'flex',
          borderTopLeftRadius: 0,
          borderTopRightRadius: 0,
        }}
      >
        <Box display={'flex'} alignItems={'center'}>
          <PlaceIcon />
        </Box>
        <Typography
          variant="body2"
          color="text.secondary"
          display={'flex'}
          alignItems={'center'}
          sx={props.address === undefined ? { color: 'red' } : {}}
        >
          {props.address}
        </Typography>
        <Box
          margin={0.2}
          sx={{ marginLeft: 'auto', marginRight: '10px', marginTop: 'auto' }}
        >
          <IconButton
            aria-label="add to favorites"
            onClick={() => setLiked(!props.isFavorite)}
          >
            {props.isFavorite ? <FavoriteIconBk /> : <FavoriteIconRed />}
          </IconButton>
        </Box>
      </Card>
    </Box>
  );
};
