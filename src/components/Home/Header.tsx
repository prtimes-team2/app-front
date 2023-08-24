import { Box, Tab, Tabs, Typography } from '@mui/material';
import React from 'react';
import { Content } from './Content';

function a11yProps(index: number) {
  return {
    id: `simple-tab-${index}`,
    'aria-controls': `simple-tabpanel-${index}`,
  };
}

export const Header = () => {
  const [value, setValue] = React.useState(0);
  const handleChange = (event: React.SyntheticEvent, newValue: number) => {
    setValue(newValue);
  };

  return (
    <>
      <header
        style={{
          position: 'sticky',
          top: 0,
          backgroundColor: 'white',
          zIndex: 1,
        }}
      >
        <Box bgcolor={'white'}>
          <Typography
            variant="h5"
            sx={{
              textAlign: 'center',
              fontWeight: 'bold',
              paddingTop: 2,
            }}
          >
            じもとコイン
          </Typography>
          <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
            <Tabs
              value={value}
              onChange={handleChange}
              aria-label="basic tabs example"
              centered
            >
              <Tab label="最近の投稿" {...a11yProps(0)} />
              <Tab label="新着質問" {...a11yProps(1)} />
            </Tabs>
          </Box>
        </Box>
      </header>
      <Content value={value} />
    </>
  );
};
