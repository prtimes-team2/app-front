import { Settings } from '@mui/icons-material';
import {
  Avatar,
  Box,
  Container,
  IconButton,
  Tab,
  Tabs,
  Typography,
} from '@mui/material';
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

  const { profile, coinLogs, reports, favorites } = useContext(AuthContext);

  const favoriteIds = favorites
    .filter((favorite) => favorite.isFavorite === true)
    .map((favorite) => favorite.reportId);

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
              <IconButton>
                <Settings />
              </IconButton>
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
              <Link to={'/app/coinlog'}>
                <Typography variant="body2" component="div" marginLeft={2}>
                  履歴
                </Typography>
              </Link>
            </Box>
          </Box>
          <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
            <Tabs
              value={value}
              onChange={handleChange}
              aria-label="basic tabs example"
              centered
            >
              <Tab label="投稿" {...a11yProps(0)} />
              <Tab label="お気に入り" {...a11yProps(1)} />
            </Tabs>
          </Box>
        </Box>
      </header>
      <CustomTabPanel value={value} index={0}>
        {/* 自分の投稿が表示される */}
        <Container maxWidth="sm" sx={{ paddingBottom: '35px' }}>
          {reports
            .filter((report) => report.author === profile?.userId)
            .map((report) => (
              <MainCard
                key={report.id}
                image="https://source.unsplash.com/random"
                title={report.title}
                detail={report.content}
                // 一旦50%の確率でtrueにする
                isFavorite={Math.random() < 0.5}
              />
            ))}
        </Container>
      </CustomTabPanel>
      <CustomTabPanel value={value} index={1}>
        {/* お気に入りの投稿が表示される reportにあって、favoritesのidのものだけを表示したい */}
        <Container maxWidth="sm" sx={{ paddingBottom: '35px' }}>
          {reports
            .filter((report) => favoriteIds.includes(report.id))
            .map((report) => (
              <MainCard
                key={report.id}
                image="https://source.unsplash.com/random"
                title={report.title}
                detail={report.content}
                isFavorite={true}
              />
            ))}
        </Container>
      </CustomTabPanel>
    </>
  );
};

export default Profile;
