import { Button, Stack, TextField } from '@mui/material';
import { useCallback, useState } from 'react';
import SendIcon from '@mui/icons-material/Send';

export const Place = () => {
  const [title, setTitle] = useState('');
  const [subTitle, setSubTitle] = useState('');
  const [hasTitleError, setHasTitleError] = useState(false);
  const [hasSubTitleError, setHasSubTitleError] = useState(false);

  const inputTitle = useCallback(
    (event: React.ChangeEvent<HTMLInputElement>) => {
      const inputValue = event.target.value;
      const isEmpty = inputValue === '';
      setTitle(inputValue);
      setHasTitleError(isEmpty);
    },
    [setTitle, setHasTitleError]
  );

  const inputSubTitle = useCallback(
    (event: React.ChangeEvent<HTMLInputElement>) => {
      const inputValue = event.target.value;

      const isEmpty = inputValue === '';
      setSubTitle(inputValue);
      setHasSubTitleError(isEmpty);
    },
    [setSubTitle, setHasSubTitleError]
  );

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    console.log(`Sybmit Title: ${title}`);
    console.log(`Sybmit SubTitle: ${subTitle}`);
  };

  return (
    <Stack
      component="form"
      noValidate
      onSubmit={handleSubmit}
      spacing={2}
      sx={{
        m: 2,
        width: '25ch',
        display: 'flex',
        alignContent: 'center',
        alignItems: 'center',
      }}
    >
      <TextField
        sx={{ width: '100%' }}
        type="text"
        label="タイトル"
        required
        value={title}
        error={hasTitleError}
        onChange={inputTitle}
        helperText={hasTitleError ? 'タイトルを入力してください。' : ''}
      />
      <TextField
        sx={{ width: '100%' }}
        type="text"
        label="サブタイトル"
        required
        value={subTitle}
        error={hasSubTitleError}
        onChange={inputSubTitle}
        helperText={hasSubTitleError ? 'サブタイトルを入力してください。' : ''}
      />
      <Button
        variant="outlined"
        endIcon={<SendIcon />}
        type="submit"
        sx={{
          borderRadius: 2,
          width: '75%',
        }}
      >
        投稿
      </Button>
    </Stack>
  );
};
