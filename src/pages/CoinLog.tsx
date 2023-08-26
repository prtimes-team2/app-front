import { useContext } from 'react';
import { AuthContext } from '../contexts/AuthContexts';
import { CoinLog } from '../types/coinLog';
import { Box, Divider, IconButton, Typography } from '@mui/material';
import { Close } from '@mui/icons-material';

const groupByDate = (logs: CoinLog[]) => {
  return logs.reduce(
    (acc, log) => {
      const date = log.created_at.split('T')[0];
      if (!acc[date]) {
        acc[date] = [];
      }
      acc[date].push(log);
      return acc;
    },
    {} as Record<string, CoinLog[]>
  );
};

const extractTime = (datetime: string): string => {
  return datetime.split('T')[1].split('.')[0];
};

const AppCoinLog = () => {
  const { coinLogs } = useContext(AuthContext);
  const groupedData = groupByDate(coinLogs);

  return (
    <div className="App" style={{ paddingBottom: '56px' }}>
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
          コイン履歴
        </Typography>
      </Box>
      <Box pl={5} pr={5}>
        {Object.entries(groupedData).map(([date, logs]) => (
          <div key={date}>
            <Typography variant="h6">{date}のコイン履歴</Typography>
            <ul>
              {logs.map((log, index) => {
                const createTime = extractTime(log.created_at);
                return (
                  <div key={index}>
                    <li
                      style={{
                        listStyle: 'none',
                        display: 'flex',
                        justifyContent: 'space-between',
                      }}
                    >
                      <Typography
                        variant="body1"
                        style={{ marginRight: 'auto' }}
                      >
                        {createTime}
                      </Typography>
                      <Typography
                        variant="subtitle1"
                        fontWeight={'bold'}
                        style={{
                          color: log.amount > 0 ? 'green' : 'red',
                          marginLeft: 'auto',
                        }}
                      >
                        {log.amount > 0 ? `+${log.amount}` : log.amount}
                      </Typography>
                    </li>
                    {index !== logs.length - 1 && <Divider />}
                  </div>
                );
              })}
            </ul>
          </div>
        ))}
      </Box>
    </div>
  );
};

export default AppCoinLog;
