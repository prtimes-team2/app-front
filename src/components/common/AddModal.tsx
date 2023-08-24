import {
  Avatar,
  Box,
  FormControl,
  InputLabel,
  MenuItem,
  Modal,
  Select,
  SelectChangeEvent,
  Typography,
} from '@mui/material';
import { useContext, useState } from 'react';
import { AuthContext } from '../../contexts/AuthContexts';
import { Place } from '../AddModal/Place';
import { Question } from '../AddModal/Question';

interface Props {
  open: boolean;
  handleClose: () => void;
}

const style = {
  position: 'absolute' as const,
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: '75vw',
  bgcolor: 'background.paper',
  borderRadius: '0.5rem',
  boxShadow: 24,
  p: 4,
};

export const AddModal = (prop: Props) => {
  const [age, setAge] = useState('place');

  const handleChange = (event: SelectChangeEvent) => {
    setAge(event.target.value);
  };
  const { profile } = useContext(AuthContext);
  return (
    <Modal open={prop.open} onClose={prop.handleClose}>
      <Box sx={style} display={'block'}>
        <Box alignItems={'center'} display={'flex'}>
          <Avatar
            alt={profile ? profile.displayName : 'no profile'}
            src={profile && profile.pictureUrl ? profile.pictureUrl : ''}
            sx={{
              width: 28,
              height: 28,
              marginRight: 1,
            }}
          />
          <FormControl
            sx={{
              m: 1,
              minWidth: 120,
              marginLeft: 'auto',
              alignItems: 'center',
            }}
            size="small"
          >
            <InputLabel id="small-label"></InputLabel>
            <Select
              labelId="small-label"
              id="small"
              value={age}
              label="Age"
              onChange={handleChange}
            >
              <MenuItem value="place">場所</MenuItem>
              <MenuItem value="question">質問</MenuItem>
            </Select>
          </FormControl>
        </Box>
        <Box display={'flex'}>
          {age === 'place' ? (
            <Place />
          ) : age === 'question' ? (
            <Question />
          ) : (
            <Typography>投稿方法を選択してください</Typography>
          )}
        </Box>
      </Box>
    </Modal>
  );
};
