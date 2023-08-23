import { Box, Tab, Tabs, Typography } from '@mui/material';
import React from 'react';
import { Latest } from './Latest';

interface TabPanelProps {
  children?: React.ReactNode;
  index: number;
  value: number;
}

function CustomTabPanel(props: TabPanelProps) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`simple-tabpanel-${index}`}
      aria-labelledby={`simple-tab-${index}`}
      {...other}
    >
      {value === index && (
        <Box sx={{ p: 3 }}>
          <Box>{children}</Box>
        </Box>
      )}
    </div>
  );
}

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
      <header>
        <Box position="sticky" top={0} bgcolor={'white'}>
          <Typography
            variant="h5"
            sx={{
              textAlign: 'center',
              fontWeight: 'bold',
              padding: '10px 0',
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
      <CustomTabPanel value={value} index={0}>
        <Latest />
      </CustomTabPanel>
      <CustomTabPanel value={value} index={1}>
        新着質問画面
      </CustomTabPanel>
    </>
  );
};
