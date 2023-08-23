import { Box, Container, Tab, Tabs, Typography } from '@mui/material';
import React from 'react';
import { MainCard } from '../common/MainCard';

import { useContext } from 'react';
import { AuthContext } from '../../contexts/AuthContexts';

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
        <Box sx={{ p: 1, pt: 2 }}>
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
  const { reports, questions } = useContext(AuthContext);
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
      <CustomTabPanel value={value} index={0}>
        {/* reportsを.mapして、MainCardに入れる*/}
        <Container maxWidth="sm" sx={{ paddingBottom: '35px' }}>
          {reports.map((report) => (
            <MainCard
              key={report.id}
              image="https://source.unsplash.com/random"
              title={report.title}
              detail={report.content}
            />
          ))}
        </Container>
      </CustomTabPanel>
      <CustomTabPanel value={value} index={1}>
        {/* questionsを.mapしてMainCardに入れる */}
        <Container maxWidth="sm" sx={{ paddingBottom: '35px' }}>
          {questions.map((question) => (
            <MainCard
              key={question.id}
              image="https://source.unsplash.com/random"
              title={question.content}
              detail={question.city}
            />
          ))}
        </Container>
      </CustomTabPanel>
    </>
  );
};
