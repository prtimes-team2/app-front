import {
  Avatar,
  Box,
  Button,
  Container,
  Tab,
  Tabs,
  Typography,
} from '@mui/material';
import ArrowRightAltIcon from '@mui/icons-material/ArrowRightAlt';

import React, { useContext, useEffect } from 'react';
import CountUp from 'react-countup';
import { Link } from 'react-router-dom';
import { MainCard } from '../components/common/MainCard';
import { AuthContext } from '../contexts/AuthContexts';

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

const Profile = () => {
  const [value, setValue] = React.useState(0);
  const handleChange = (event: React.SyntheticEvent, newValue: number) => {
    setValue(newValue);
  };
  const [totalCoin, setTotalCoin] = React.useState(0);

  const { profile, coinLogs, reports, favoriteIds, selfQuestions } =
    useContext(AuthContext);

  useEffect(() => {
    let total = 0;
    coinLogs.forEach((coinLog) => {
      total += coinLog.amount;
    });
    setTotalCoin(total);
  }, [coinLogs]);
  return (
    <>
      <header>
        <Box top={0} bgcolor={'white'}>
          <Box margin={3}>
            <Box display={'flex'} justifyContent={'center'} mb={2}>
              <Avatar
                alt={profile ? profile.displayName : 'no profile'}
                src={profile && profile.pictureUrl ? profile.pictureUrl : ''}
                sx={{ width: 56, height: 56, marginRight: 2 }}
              />
              <Typography
                variant="h5"
                component="div"
                display={'flex'}
                alignItems={'center'}
              >
                {profile ? profile.displayName : 'no profile'}
              </Typography>
            </Box>
            <Box
              display={'flex'}
              alignItems={'flex-end'}
              justifyContent={'center'}
            >
              <Typography variant="body2" component="div" marginRight={2}>
                残高
              </Typography>
              <Typography variant="h2" component="div" fontWeight={'bold'}>
                <CountUp start={0} end={totalCoin} duration={0.3} />
              </Typography>
              <Typography variant="body2" component="div" marginLeft={2}>
                コイン
              </Typography>
            </Box>
            <Box
              display={'flex'}
              justifyContent={'center'}
              alignItems="center"
              sx={{ marginTop: 1 }}
            >
              <Button
                variant="outlined"
                size="small"
                component={Link}
                to={'/app/coinlog'}
                sx={{ borderRadius: '16px' }}
              >
                <Typography variant="body2" component="div">
                  履歴
                </Typography>
                <ArrowRightAltIcon />
              </Button>
            </Box>
          </Box>
          <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
            <Tabs
              value={value}
              onChange={handleChange}
              aria-label="basic tabs example"
              centered
            >
              <Tab disableRipple label="投稿" {...a11yProps(0)} />
              <Tab disableRipple label="質問" {...a11yProps(1)} />
              <Tab disableRipple label="お気に入り" {...a11yProps(2)} />
            </Tabs>
          </Box>
        </Box>
      </header>
      <CustomTabPanel value={value} index={0}>
        {/* 自分の投稿が表示される */}
        <Container maxWidth="sm" sx={{ paddingBottom: '56px' }}>
          {reports
            .filter((report) => report.user_id === profile?.userId)
            .map((report) => (
              <MainCard
                key={report.id}
                postKey={report.id}
                image={report.imageUrls[0]}
                title={report.title}
                detail={report.content}
                address={report.address}
                isFavorite={favoriteIds.includes(report.id)}
                userId=""
              />
            ))}
        </Container>
      </CustomTabPanel>
      <CustomTabPanel value={value} index={1}>
        {/* 自分の投稿した質問を表示したい */}
        <Container maxWidth="sm" sx={{ paddingBottom: '35px' }}>
          {selfQuestions.map((selfQuestion) => (
            <div key={selfQuestion.question_id}>
              {selfQuestion.content}
              {selfQuestion.created_at}
            </div>
          ))}
        </Container>
      </CustomTabPanel>
      <CustomTabPanel value={value} index={2}>
        {/* お気に入りの投稿が表示される reportにあって、favoritesのidのものだけを表示したい */}
        <Container maxWidth="sm" sx={{ paddingBottom: '35px' }}>
          {reports
            .filter((report) => favoriteIds.includes(report.id))
            .map((report) => (
              <MainCard
                key={report.id}
                postKey={report.id}
                image={report.imageUrls[0]}
                title={report.title}
                detail={report.content}
                address={report.address}
                isFavorite={true}
                userId=""
              />
            ))}
        </Container>
      </CustomTabPanel>
    </>
  );
};

export default Profile;
