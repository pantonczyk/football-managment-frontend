import React, { memo } from 'react';
import { NavLink } from 'react-router-dom';
import { CSSTransition } from 'react-transition-group';
import { bool, string, object } from 'prop-types';

import './SidebarLink.scss';

const SidebarLink = ({ sidebarCollapsed, title, path, icon, exact }) => {
   return (
      <NavLink
         to={path}
         className="sidebarLink"
         activeClassName="sidebarLink--active"
         exact={exact}
      >
         {icon}
         <CSSTransition
            in={!sidebarCollapsed}
            timeout={400}
            classNames="sidebarLink-collapse-translation"
            unmountOnExit
         >
            <span className="sidebarLink__text">{title}</span>
         </CSSTransition>
      </NavLink>
   );
};

SidebarLink.propTypes = {
   sidebarCollapsed: bool,
   title: string,
   path: string,
   icon: object,
   exact: bool,
};

export default memo(SidebarLink);
