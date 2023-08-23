import { Avatar, Box, IconButton, Tab, Tabs, Typography } from '@mui/material';
import React, { useContext } from 'react';
import { AuthContext } from '../contexts/AuthContexts';
import { TestCard } from '../components/common/TestCard';
import { Settings } from '@mui/icons-material';

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
  const { profile } = useContext(AuthContext);
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
                {/* TODO: コイン数表示 */}0
              </Typography>
              <Typography variant="body2" component="div" marginLeft={2}>
                コイン
              </Typography>
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
        <TestCard />
      </CustomTabPanel>
      <CustomTabPanel value={value} index={1}>
        <TestCard />
      </CustomTabPanel>
    </>
  );
};

export default Profile;
