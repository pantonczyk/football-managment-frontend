import React from 'react';
import { useParams } from 'react-router-dom';

import StatisticsTabsPanel from 'components/StatisticsTabsPanel';
import StatisticsTab from 'components/StatisticsTabsPanel/StatisticsTab';
import TeamsStatisticsTable from 'components/StatisticsTable/TeamsStatisticsTable';
import PlayersStatisticsTable from 'components/StatisticsTable/PlayersStatisticsTable';

import './LeagueStatisticsTab.scss';

const LeagueStatisticsTab = () => {
   const { leagueGid } = useParams();

   return (
      <div className="leagueStatisticsTab">
         <StatisticsTabsPanel selected={0}>
            <StatisticsTab title="Zespoły">
               <TeamsStatisticsTable leagueGid={leagueGid} />
            </StatisticsTab>
            <StatisticsTab title="Zawodnicy">
               <PlayersStatisticsTable leagueGid={leagueGid} />
            </StatisticsTab>
         </StatisticsTabsPanel>
      </div>
   );
};

export default LeagueStatisticsTab;
