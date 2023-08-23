import { Card, CardMedia, Box, CardContent, Typography } from '@mui/material';

type propsType = {
  image: string;
  title: string;
  detail: string;
};

export const MainCard = (props: propsType) => {
  return (
    <Card sx={{ display: 'flex', width: '100vw' }}>
      <CardMedia
        image={props.image}
        title="画像"
        sx={{
          height: 75,
          width: '20vw',
          objectFit: 'cover',
          padding: 2,
        }}
      />
      <Box sx={{ display: 'flex', flexDirection: 'column', width: '80vw' }}>
        <CardContent sx={{ flex: '1 0 auto' }}>
          <Typography component="div" variant="h6">
            {props.title}
          </Typography>
          <Typography
            variant="subtitle2"
            color="text.secondary"
            component="div"
            sx={{
              whiteSpace: 'nowrap',
              overflow: 'hidden',
              textOverflow: 'ellipsis',
            }}
          >
            {props.detail}
          </Typography>
        </CardContent>
      </Box>
    </Card>
  );
};
