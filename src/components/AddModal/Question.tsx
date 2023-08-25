import liff from '@line/liff';
import * as React from 'react';
import { Filter } from '../common/Filter';

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

    function splitAddress(address: string): string[] {
      const prefectures = [
        '北海道',
        '青森県',
        '岩手県',
        '宮城県',
        '秋田県',
        '山形県',
        '福島県',
        '茨城県',
        '栃木県',
        '群馬県',
        '埼玉県',
        '千葉県',
        '東京都',
        '神奈川県',
        '新潟県',
        '富山県',
        '石川県',
        '福井県',
        '山梨県',
        '長野県',
        '岐阜県',
        '静岡県',
        '愛知県',
        '三重県',
        '滋賀県',
        '京都府',
        '大阪府',
        '兵庫県',
        '奈良県',
        '和歌山県',
        '鳥取県',
        '島根県',
        '岡山県',
        '広島県',
        '山口県',
        '徳島県',
        '香川県',
        '愛媛県',
        '高知県',
        '福岡県',
        '佐賀県',
        '長崎県',
        '熊本県',
        '大分県',
        '宮崎県',
        '鹿児島県',
        '沖縄県',
        // 誤記を考慮する場合は都道府県名のバリエーション(例："京都"、“大阪”など)も追加できます
      ];

      for (const pre of prefectures) {
        if (address.startsWith(pre)) {
          return [pre, address.slice(pre.length)];
        }
      }

      throw new Error(`Invalid address: ${address}`);
    }

    // addressは滋賀県大津市のように都道府県と市区町村が入っているaddressを都道府県のいずれかでsplitしてprefectureとcityに分ける
    const [prefecture, city] = splitAddress(address);
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
