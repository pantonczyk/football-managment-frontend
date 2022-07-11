import React, { memo, useState, useMemo } from 'react';
import classNames from 'classnames';
import shortid from 'shortid';
import { string } from 'prop-types';

import useToggleVisibility from 'hooks/useToggleVisibility';

import ThemedTooltip from 'components/ThemedTooltip';
import SidebarLink from './SidebarLink';

import { userRoles } from 'api/utils/userRoles';
import { leagueOrganizerLinks, teamRepresentativeLinks } from './utils/sidebarData';

import FootballManagmentLogo from 'images/logo.svg';
import ArrowLeftIcon from 'icons/arrow_left.svg';

import './Sidebar.scss';

const Sidebar = ({ userRole }) => {
   const [sidebarCollapsed, toggleSidebarCollapse] = useToggleVisibility(false);
   const [userLinks, setUserLinks] = useState([]);

   useMemo(() => {
      switch (userRole) {
         case userRoles.leagueOrganizer:
            setUserLinks(leagueOrganizerLinks);
            break;
         case userRoles.teamRepresentative:
            setUserLinks(teamRepresentativeLinks);
            break;
         default:
            return null;
      }
   }, [userRole]);

   const { sidebarClass, collapseIconClass } = {
      sidebarClass: classNames(
         'sidebar',
         sidebarCollapsed ? 'sidebar--collapsed' : 'sidebar--expanded'
      ),
      collapseIconClass: classNames('collapseIcon', {
         'collapseIcon--collapsed': sidebarCollapsed,
      }),
   };

   return (
      <nav className={sidebarClass}>
         <ThemedTooltip title={sidebarCollapsed ? 'Rozwiń menu boczne' : 'Zweź menu boczne'}>
            <span className="toggleCollapseButton" onClick={toggleSidebarCollapse}>
               <img
                  src={ArrowLeftIcon}
                  alt="Ikona przycisku do zwijania bocznego menu"
                  width="27"
                  height="27"
                  className={collapseIconClass}
               />
            </span>
         </ThemedTooltip>

         <div className="sidebar__header">
            <img src={FootballManagmentLogo} alt="Logo Football managment" className="logo" />
            {!sidebarCollapsed && <span>Football Managment</span>}
         </div>

         <div className="sidebar__navigation">
            {userLinks?.map(({ title, path, icon, exact }) => (
               <SidebarLink
                  key={shortid()}
                  sidebarCollapsed={sidebarCollapsed}
                  title={title}
                  path={path}
                  icon={icon}
                  exact={exact}
               />
            ))}
         </div>
      </nav>
   );
};

Sidebar.propTypes = {
   userRole: string,
};

export default memo(Sidebar);
