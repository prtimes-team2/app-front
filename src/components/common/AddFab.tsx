import { Box, Fab } from '@mui/material';
import AddIcon from '@mui/icons-material/Add';

export const AddFab = () => {
  return (
    <Box role="presentation" sx={{ position: 'fixed', bottom: 80, right: 16 }}>
      <Fab color="info">
        <AddIcon />
      </Fab>
    </Box>
  );
};
