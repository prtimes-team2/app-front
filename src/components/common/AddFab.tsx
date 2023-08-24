import { Box, Fab, Zoom, keyframes } from '@mui/material';
import AddIcon from '@mui/icons-material/Add';
import { AddModal } from './AddModal';
import { useState, useEffect } from 'react';

const rotate = keyframes`
  from {
    transform: rotate(0deg);
  }
  to {
    transform: rotate(90deg);
  }
`;

export const AddFab = () => {
  const [open, setOpen] = useState(false);
  const [rotateIcon, setRotateIcon] = useState(true);

  useEffect(() => {
    const timeout = setTimeout(() => {
      setRotateIcon(false);
    }, 500); // 0.5秒後にアニメーションを停止

    return () => {
      clearTimeout(timeout);
    };
  }, []);

  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  return (
    <>
      <Box
        role="presentation"
        sx={{ position: 'fixed', bottom: 80, right: 16 }}
      >
        <Zoom in={true} timeout={300}>
          <Fab color="info" onClick={handleOpen}>
            <AddIcon
              sx={rotateIcon ? { animation: `${rotate} 0.5s linear` } : {}}
            />
          </Fab>
        </Zoom>
      </Box>
      <AddModal open={open} handleClose={handleClose} />
    </>
  );
};
