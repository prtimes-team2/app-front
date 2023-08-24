import { Box, Fab } from '@mui/material';
import AddIcon from '@mui/icons-material/Add';
import { AddModal } from './AddModal';
import { useState } from 'react';

export const AddFab = () => {
  const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  return (
    <>
      <Box
        role="presentation"
        sx={{ position: 'fixed', bottom: 80, right: 16 }}
      >
        <Fab color="info" onClick={handleOpen}>
          <AddIcon />
        </Fab>
      </Box>
      <AddModal open={open} handleClose={handleClose} />
    </>
  );
};
