import React from 'react';

import DashboardRoundedIcon from '@mui/icons-material/DashboardRounded';
import AccountCircleRoundedIcon from '@mui/icons-material/AccountCircleRounded';
import AddCircleRoundedIcon from '@mui/icons-material/AddCircleRounded';
import GroupAddIcon from '@mui/icons-material/GroupAdd';

export const leagueOrganizerLinks = [
   {
      title: 'Panel organizatora',
      path: '/league-organizer/leagues',
      icon: <DashboardRoundedIcon />,
      exact: false,
   },
   {
      title: 'Utwórz ligę',
      path: '/league-organizer/create-league',
      icon: <AddCircleRoundedIcon />,
      exact: false,
   },
   {
      title: 'Profil użytkownika',
      path: '/league-organizer/user-profile',
      icon: <AccountCircleRoundedIcon />,
      exact: false,
   },
];

export const teamRepresentativeLinks = [
   {
      title: 'Panel reprezentanta',
      path: '/team-representative/teams',
      icon: <DashboardRoundedIcon />,
      exact: false,
   },
   {
      title: 'Utwórz zespół',
      path: '/team-representative/create-team',
      icon: <GroupAddIcon />,
      exact: false,
   },
   {
      title: 'Profil użytkownika',
      path: '/team-representative/user-profile',
      icon: <AccountCircleRoundedIcon />,
      exact: false,
   },
];
