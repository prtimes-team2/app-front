import { Close } from '@mui/icons-material';
import {
  Avatar,
  Box,
  IconButton,
  Skeleton,
  Typography,
  TextField,
} from '@mui/material';
import { useCallback, useContext, useState } from 'react';
import { useLocation } from 'react-router-dom';
import { AuthContext } from '../contexts/AuthContexts';

const QuestionDetail = () => {
  const pathname = useLocation().pathname;
  const questionId = Number(pathname.split('/')[3]);
  const { questions } = useContext(AuthContext);
  const question = questions.find(
    (question) => question.question_id === questionId
  );
  const [title, setTitle] = useState('');
  const [hasTitleError, setHasTitleError] = useState(false);
  const inputTitle = useCallback(
    (event: React.ChangeEvent<HTMLInputElement>) => {
      const inputValue = event.target.value;
      const isEmpty = inputValue === '';
      setTitle(inputValue);
      setHasTitleError(isEmpty);
    },
    [setTitle, setHasTitleError]
  );

  return (
    <>
      <Box padding={2} display={'flex'}>
        <IconButton
          sx={{ marginRight: 1 }}
          onClick={() => window.history.back()}
        >
          <Close />
        </IconButton>
        <Typography
          variant="h6"
          fontWeight={'bold'}
          display={'flex'}
          alignItems={'center'}
          justifyContent={'center'}
        >
          質問
        </Typography>
      </Box>
      <Box paddingX={4}>
        <Box sx={{ width: '100%' }} display={'flex'}>
          <Avatar
            alt={question ? question.displayName : 'no profile'}
            src={
              question && question.profileImageUrl
                ? question.profileImageUrl
                : ''
            }
            sx={{ width: 40, height: 40, marginRight: 1 }}
          />
          {question ? (
            <Typography
              variant="subtitle1"
              component="div"
              display={'flex'}
              alignItems={'center'}
            >
              {question ? question.displayName : 'no profile'}
            </Typography>
          ) : (
            <Skeleton width="10vh" animation="wave">
              <Typography>.</Typography>
            </Skeleton>
          )}
          <Typography
            variant="subtitle2"
            component="div"
            display={'flex'}
            alignItems={'center'}
            marginLeft={'auto'}
          >
            {question ? (
              question.created_at.split('T')[0]
            ) : (
              <Skeleton width="20vh" animation="wave">
                <Typography>.</Typography>
              </Skeleton>
            )}
          </Typography>
        </Box>
        <Typography variant="body1" pt={1}>
          質問内容
        </Typography>
        {question ? (
          <Typography variant="h6" ml={1}>
            {question?.content}
          </Typography>
        ) : (
          <Skeleton width="10vh" animation="wave">
            <Typography>.</Typography>
          </Skeleton>
        )}
        {/* 一番下に動かして */}
        <Box
          sx={{ width: '100%' }}
          display={'flex'}
          alignItems={'center'}
          pt={2}
        >
          <TextField
            sx={{ width: '100%' }}
            type="text"
            label="回答を入力"
            required
            value={title}
            error={hasTitleError}
            onChange={inputTitle}
            helperText={hasTitleError ? '回答を入力してください。' : ''}
          />
        </Box>
      </Box>
    </>
  );
};

export default QuestionDetail;
