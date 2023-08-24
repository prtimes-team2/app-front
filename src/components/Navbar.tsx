import * as React from 'react';
import { useEffect } from 'react';

import { useNavigate } from 'react-router-dom';

import { BottomNavigation } from '@mui/material';
import { BottomNavigationAction } from '@mui/material';
import { Paper } from '@mui/material';

import HomeIcon from '@mui/icons-material/HomeOutlined';
import HomeFilledIcon from '@mui/icons-material/Home';
import SearchIcon from '@mui/icons-material/SearchOutlined';
import SearchFilledIcon from '@mui/icons-material/Search';
import PlaceIcon from '@mui/icons-material/PlaceOutlined';
import PlaceFilledIcon from '@mui/icons-material/Place';
import AccountCircleIcon from '@mui/icons-material/AccountCircleOutlined';
import AccountCircleFilledIcon from '@mui/icons-material/AccountCircle';

export const Navbar = () => {
  const navigate = useNavigate();

  const [selectedTab, setSelectedTab] = React.useState('/app/home'); // デフォルトのタブ

  useEffect(() => {
    setSelectedTab(location.pathname); // パスの変更を検出して、selectedTabを更新
  }, [location.pathname]);

  const handleTabChange = (route: string) => {
    navigate(route);
    setSelectedTab(route);
  };

  return (
    <Paper
      sx={{ position: 'fixed', bottom: 0, left: 0, right: 0 }}
      elevation={3}
    >
      <BottomNavigation value={selectedTab} showLabels>
        <BottomNavigationAction
          label="ホーム"
          icon={selectedTab === '/app/home' ? <HomeFilledIcon /> : <HomeIcon />}
          value="/app/home"
          onClick={() => handleTabChange('/app/home')}
          disableRipple
          sx={{
            ...(selectedTab === '/app/home' ? { color: 'primary.main' } : {}),
            '& .MuiBottomNavigationAction-label': { fontSize: '0.4rem' },
          }}
        />
        <BottomNavigationAction
          label="検索"
          icon={
            selectedTab === '/app/search' ? (
              <SearchFilledIcon />
            ) : (
              <SearchIcon />
            )
          }
          value="/app/search"
          onClick={() => handleTabChange('/app/search')}
          disableRipple
          sx={{
            ...(selectedTab === '/app/search' ? { color: 'primary.main' } : {}),
            '& .MuiBottomNavigationAction-label': { fontSize: '0.4rem' },
          }}
        />
        <BottomNavigationAction
          label="マップ"
          icon={
            selectedTab === '/app/map' ? <PlaceFilledIcon /> : <PlaceIcon />
          }
          value="/app/map"
          disableRipple
          onClick={() => handleTabChange('/app/map')}
          sx={{
            ...(selectedTab === '/app/map' ? { color: 'primary.main' } : {}),
            '& .MuiBottomNavigationAction-label': { fontSize: '0.4rem' },
          }}
        />
        <BottomNavigationAction
          label="ユーザー"
          icon={
            selectedTab === '/app/user' ? (
              <AccountCircleFilledIcon />
            ) : (
              <AccountCircleIcon />
            )
          }
          value="/app/user"
          disableRipple
          onClick={() => handleTabChange('/app/user')}
          sx={{
            ...(selectedTab === '/app/user' ? { color: 'primary.main' } : {}),
            '& .MuiBottomNavigationAction-label': { fontSize: '0.4rem' },
          }}
        />
      </BottomNavigation>
    </Paper>
  );
};
