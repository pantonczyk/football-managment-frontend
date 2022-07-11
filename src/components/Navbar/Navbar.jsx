import React, { memo } from 'react';
import { useHistory } from 'react-router';
import { useApolloClient } from '@apollo/client';
import { object } from 'prop-types';

import { logout } from 'api/logout';
import parseImage from 'parsers/paresImage';

import Breadcrumbs from 'components/Breadcrumbs';
import ThemedTooltip from 'components/ThemedTooltip';
import ThemedIconButton from 'components/ThemedIconButton';

import LogoutRoundedIcon from '@mui/icons-material/LogoutRounded';
import DefaultUserImage from 'images/default_user.png';

import './Navbar.scss';

const Navbar = ({ userData }) => {
   const history = useHistory();
   const client = useApolloClient();

   const { firstName = '', groups = '', photo = '' } = userData || {};
   const userPhoto = parseImage(photo, DefaultUserImage);

   return (
      <div className="navbar">
         <Breadcrumbs />

         <div className="navbar__user">
            <div className="user__panel">
               <img src={userPhoto} alt="Zdjęcie użytkownika" className="user__image" />

               <div className="user__data">
                  <span className="name">{firstName}</span>
                  <span className="group">{groups[0]?.name}</span>
               </div>
            </div>

            <ThemedIconButton
               ariaLabel="Wyloguj"
               size="medium"
               color="primary"
               onClick={logout(history, client)}
            >
               <ThemedTooltip title="Wyloguj">
                  <LogoutRoundedIcon fontSize="inherit" />
               </ThemedTooltip>
            </ThemedIconButton>
         </div>
      </div>
   );
};

Navbar.propTypes = {
   currentUser: object,
};

export default memo(Navbar);
