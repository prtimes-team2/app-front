import * as React from 'react';
import { Filter } from '../common/Filter';

import { Box, Typography } from '@mui/material';

export const Question = () => {
  const [address, setAddress] = React.useState('');
  console.log(address);

  return (
    <Box>
      <Box display="flex">
        <Filter filterKey="post-question" setAddress={setAddress} />
        <Typography>が地元の方へ</Typography>
      </Box>
      <Box>
        <Typography></Typography>
      </Box>
      <Typography>Question</Typography>
    </Box>
  );
};
