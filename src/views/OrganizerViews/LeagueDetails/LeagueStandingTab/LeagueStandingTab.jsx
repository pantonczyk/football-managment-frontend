import React from 'react';
import { useParams } from 'react-router-dom';

import LeagueStandingTable from './LeagueStandingTable';

import './LeagueStandingTab.scss';

const LeagueStandingTab = () => {
   const { leagueGid } = useParams();

   return (
      <div className="leagueStandingTab">
         <div className="leagueStandingTab__header">
            <h1>Tabela ligowa</h1>
         </div>
         <div className="leagueStandingTab__table">
            <LeagueStandingTable leagueGid={leagueGid} />
         </div>
      </div>
   );
};

export default LeagueStandingTab;
