import {
  Box,
  Card,
  CardContent,
  CardMedia,
  IconButton,
  Typography,
} from '@mui/material';
interface propsType {
  image: string;
  title: string;
  detail: string;
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
  return (
    <Box marginBottom={1}>
      <Card sx={{ display: 'flex' }}>
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
        <Box sx={{ display: 'flex', flexDirection: 'column' }}>
          <CardContent sx={{ flex: '1 0 auto' }}>
            <Typography
              component="div"
              variant="h6"
              sx={{
                width: '164px',
                textOverflow: 'ellipsis',
                overflow: 'hidden',
              }}
            >
              {props.title}
            </Typography>
            <Typography
              variant="subtitle2"
              color="text.secondary"
              component="div"
              sx={{
                width: '164px',
                textOverflow: 'ellipsis',
                overflow: 'hidden',
              }}
            >
              {props.detail}
            </Typography>
            {/* ハートアイコン */}
            <Box sx={{ mt: 1, display: 'flex', justifyContent: 'flex-end' }}>
              <IconButton aria-label="add to favorites">
                {props.isFavorite ? <FavoriteIconBk /> : <FavoriteIconRed />}
              </IconButton>
            </Box>
          </CardContent>
        </Box>
      </Card>
    </Box>
  );
};
