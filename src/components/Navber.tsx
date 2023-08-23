import * as React from 'react';

import { useNavigate } from 'react-router-dom';

import { BottomNavigation } from '@mui/material';
import { BottomNavigationAction } from '@mui/material';
import { Paper } from '@mui/material';

import HomeIcon from '@mui/icons-material/Home';
import SearchIcon from '@mui/icons-material/Search';
import PlaceIcon from '@mui/icons-material/Place';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';

export const Navber = () => {
  const navigate = useNavigate();

  return (
    <Paper
      sx={{ position: 'fixed', bottom: 0, left: 0, right: 0 }}
      elevation={3}
    >
      <BottomNavigation>
        <BottomNavigationAction
          label="Home"
          icon={<HomeIcon />}
          onClick={() => navigate('/app/home')}
        />
        <BottomNavigationAction
          label="Search"
          icon={<SearchIcon />}
          onClick={() => navigate('/app/search')}
        />
        <BottomNavigationAction
          label="Map"
          icon={<PlaceIcon />}
          onClick={() => navigate('/app/map')}
        />
        <BottomNavigationAction
          label="User"
          icon={<AccountCircleIcon />}
          onClick={() => navigate('/app/user')}
        />
      </BottomNavigation>
    </Paper>
  );
};
