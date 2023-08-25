import * as React from 'react';
import { Filter } from '../common/Filter';
import liff from '@line/liff';

import { TextareaAutosize } from '@mui/base/TextareaAutosize';
import { Box, Button, Stack, TextField, Typography } from '@mui/material';

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
    [setBodyText, setHasBodyTextError]
  );

  const handleSubmit = async () => {
    console.log('submit');
    console.log(address);
    console.log(reward);
    console.log(bodyText);

    //  /questionにpostする
    const baseUrl = process.env.REACT_APP_API_BASE_URL;
    if (!baseUrl) {
      console.log('baseUrl is undefined');
      return;
    }

    // addressは滋賀県大津市のように都道府県と市区町村が入っているaddressを都道府県のいずれかでsplitしてprefectureとcityに分ける
    const [prefecture, city] = address.split(/(都|道|府|県)/);
    console.log(prefecture);
    console.log(city);

    // APIにリクエスト
    const options = {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        idToken: liff.getIDToken() ?? 'id_token',
        prefecture,
        city,
        reward,
        content: bodyText,
      }),
    };

    const res = await fetch(baseUrl + '/question', options);
    const resData = (await res.json()) as { amount: number };
    console.log(resData);
  };

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
            <Button onClick={handleSubmit}>質問する</Button>
          </Box>
        </Stack>
      </Stack>
    </Box>
  );
};
