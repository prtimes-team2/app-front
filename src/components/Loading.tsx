import { Box, Typography } from '@mui/material';
import { ColorRing } from 'react-loader-spinner';

export const Loading = () => {
  return (
    <Box
      sx={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        minHeight: '100vh',
      }}
    >
      <ColorRing
        visible={true}
        height="80"
        width="80"
        ariaLabel="blocks-loading"
        wrapperStyle={{}}
        wrapperClass="blocks-wrapper"
        colors={['#e15b64', '#f47e60', '#f8b26a', '#abbd81', '#849b87']}
      />
      <Typography variant="h5" component="div" gutterBottom>
        ページを読み込んでいます....
      </Typography>
    </Box>
  );
};
