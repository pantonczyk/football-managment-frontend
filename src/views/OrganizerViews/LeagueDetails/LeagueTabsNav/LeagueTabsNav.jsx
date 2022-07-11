import React from 'react';
import { useRouteMatch, NavLink } from 'react-router-dom';

import './LeagueTabsNav.scss';

const LeagueTabsNav = () => {
   const { url } = useRouteMatch();

   return (
      <nav className="leagueTabsNav">
         <NavLink
            to={`${url}/overview`}
            className="leagueTabsNav__item"
            activeClassName="leagueTabsNav__item--active"
         >
            Informacje
         </NavLink>
         <NavLink
            to={`${url}/league-manage`}
            className="leagueTabsNav__item"
            activeClassName="leagueTabsNav__item--active"
         >
            Zarządzanie ligą
         </NavLink>
         <NavLink
            to={`${url}/teams`}
            className="leagueTabsNav__item"
            activeClassName="leagueTabsNav__item--active"
         >
            Zespoły
         </NavLink>
         <NavLink
            to={`${url}/league-standing`}
            className="leagueTabsNav__item"
            activeClassName="leagueTabsNav__item--active"
         >
            Tabela ligowa
         </NavLink>
         <NavLink
            to={`${url}/league-schedule`}
            className="leagueTabsNav__item"
            activeClassName="leagueTabsNav__item--active"
         >
            Terminarz ligi
         </NavLink>
         <NavLink
            to={`${url}/league-statistics`}
            className="leagueTabsNav__item"
            activeClassName="leagueTabsNav__item--active"
         >
            Statystyki
         </NavLink>
      </nav>
   );
};

export default LeagueTabsNav;
