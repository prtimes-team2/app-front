import {
  Box,
  Card,
  CardActionArea,
  CardContent,
  CardMedia,
  IconButton,
  Typography,
} from '@mui/material';
import PlaceIcon from '@mui/icons-material/Place';
import { useNavigate } from 'react-router-dom';

interface propsType {
  postKey: number;
  image: string;
  title: string;
  detail: string;
  address: string;
  isFavorite?: boolean;
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
  const navigate = useNavigate();
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
            navigate(`/app/detail/${props.postKey}`);
          }}
        >
          <CardMedia
            image={props.image}
            title="画像"
            sx={{
              height: 75,
              width: 75,
              minWidth: 75,
              objectFit: 'cover',
              padding: 2,
            }}
          />
          <Box sx={{ flex: '1' }} position={'relative'} overflow={'hidden'}>
            <CardContent>
              <Typography
                component="div"
                variant="h6"
                sx={{
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
        >
          {props.address}
        </Typography>
        <Box
          margin={0.2}
          sx={{ marginLeft: 'auto', marginRight: '10px', marginTop: 'auto' }}
        >
          <IconButton
            aria-label="add to favorites"
            onClick={() => {
              console.log('liked!');
            }}
          >
            {props.isFavorite ? <FavoriteIconBk /> : <FavoriteIconRed />}
          </IconButton>
        </Box>
      </Card>
    </Box>
  );
};
