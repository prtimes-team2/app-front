import { Card, CardMedia, Box, CardContent, Typography } from '@mui/material';

type propsType = {
  image: string;
  title: string;
  detail: string;
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
          </CardContent>
        </Box>
      </Card>
    </Box>
  );
};
