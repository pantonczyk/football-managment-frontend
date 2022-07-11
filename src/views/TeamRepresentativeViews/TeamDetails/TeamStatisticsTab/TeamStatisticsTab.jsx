import React, { memo } from 'react';
import { string } from 'prop-types';

import StatisticsTabsPanel from 'components/StatisticsTabsPanel';
import StatisticsTab from 'components/StatisticsTabsPanel/StatisticsTab';
import TeamsStatisticsTable from 'components/StatisticsTable/TeamsStatisticsTable';
import PlayersStatisticsTable from 'components/StatisticsTable/PlayersStatisticsTable';

import './TeamStatisticsTab.scss';

const TeamStatisticsTab = ({ leagueGid }) => {
   return (
      <div className="teamStatisticsTab">
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

TeamStatisticsTab.propTypes = {
   leagueGid: string,
};

export default memo(TeamStatisticsTab);
