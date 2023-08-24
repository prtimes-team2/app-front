import * as React from 'react';
import { Filter } from '../common/Filter';

import { Box, Stack, Typography, TextField, Button } from '@mui/material';
import { TextareaAutosize } from '@mui/base/TextareaAutosize';

export const Question = () => {
  const [reward, setReward] = React.useState<number>(0);
  const [hasRewardError, setHasRewardError] = React.useState<boolean>(false);
  const [bodyText, setBodyText] = React.useState<string>('');
  const [hasBodyTextError, setHasBodyTextError] =
    React.useState<boolean>(false);
  const [address, setAddress] = React.useState<string>('');
  console.log(address);

  const inputReward = React.useCallback(
    (event: React.ChangeEvent<HTMLInputElement>) => {
      const inputValue = event.target.value;
      const isEmpty = inputValue === '';
      setReward(Number(inputValue));
      setHasRewardError(isEmpty);
    },
    [setReward, setHasRewardError]
  );

  const inputBodyText = React.useCallback(
    (event: React.ChangeEvent<HTMLTextAreaElement>) => {
      const inputValue = event.target.value;
      const isEmpty = inputValue === '';
      setBodyText(inputValue);
      setHasBodyTextError(isEmpty);
    },
    [setBodyText, , setHasBodyTextError]
  );

  return (
    <Box>
      <Stack>
        <Box display="flex">
          <Filter filterKey="post-question" setAddress={setAddress} />
          <Typography>が地元の方へ</Typography>
        </Box>
        <Stack>
          <Box>
            <Typography>質問に答えていただいた方々に</Typography>
            <TextField
              type="number"
              required
              value={reward}
              error={hasRewardError}
              onChange={inputReward}
              helperText={
                hasRewardError ? 'プレゼントするコインを入力してください。' : ''
              }
            />
          </Box>
          <Box>
            <Typography>コインを差し上げます！</Typography>
          </Box>
          <Box>
            <TextField
              type="text"
              required
              value={bodyText}
              InputProps={{
                inputComponent: TextareaAutosize,
              }}
              error={hasBodyTextError}
              onChange={inputBodyText}
              helperText={hasBodyTextError ? '本文を入力してください。' : ''}
            />
          </Box>
          <Box>
            <Typography>
              Tips: コインは投稿をすることで手に入るかも...
            </Typography>
          </Box>
          <Box>
            <Button>質問する</Button>
          </Box>
        </Stack>
      </Stack>
    </Box>
  );
};
