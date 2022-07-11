import React from 'react';
import { useRouteMatch, NavLink } from 'react-router-dom';

import './TeamTabsNav.scss';

const TeamTabsNav = () => {
   const { url } = useRouteMatch();

   return (
      <nav className="teamTabsNav">
         <NavLink
            to={`${url}/overview`}
            className="teamTabsNav__item"
            activeClassName="teamTabsNav__item--active"
         >
            Informacje
         </NavLink>
         <NavLink
            to={`${url}/team-composition`}
            className="teamTabsNav__item"
            activeClassName="teamTabsNav__item--active"
         >
            Skład zespołu
         </NavLink>
         <NavLink
            to={`${url}/league`}
            className="teamTabsNav__item"
            activeClassName="teamTabsNav__item--active"
         >
            Liga
         </NavLink>
         <NavLink
            to={`${url}/team-match-schedule`}
            className="teamTabsNav__item"
            activeClassName="teamTabsNav__item--active"
         >
            Terminarz rozgrywek
         </NavLink>
         <NavLink
            to={`${url}/league-statistics`}
            className="teamTabsNav__item"
            activeClassName="teamTabsNav__item--active"
         >
            Statystyki
         </NavLink>
      </nav>
   );
};

export default TeamTabsNav;
