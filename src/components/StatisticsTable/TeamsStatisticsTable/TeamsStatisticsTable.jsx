import React, { memo, useState, useMemo } from 'react';
import { useQuery } from '@apollo/client';
import { string } from 'prop-types';

import GET_TEAMS_STATISTICS_BY_LEAGUE from 'api/queries/GET_TEAMS_STATISTICS_BY_LEAGUE';

import Loader from 'components/Loader';
import ThemedTooltip from 'components/ThemedTooltip';
import ThemedScrollDiv from 'components/ThemedScrollDiv';

import './TeamsStatisticsTable.scss';

const TeamsStatisticsTable = ({ leagueGid }) => {
   const [teamsStatisticsList, setTeamsStatisticsList] = useState([]);

   const { data, loading } = useQuery(GET_TEAMS_STATISTICS_BY_LEAGUE, {
      variables: {
         leagueGid,
      },
      fetchPolicy: 'cache-and-network',
   });

   useMemo(() => {
      setTeamsStatisticsList(data?.teamsStatistics);
   }, [data]);

   return (
      <div className="teamsStatisticsTable">
         <div className="teamsStatisticsTable__header">
            <h1>Statystyki drużyn w lidze</h1>
         </div>

         <ul className="teamsStatisticsTable__table">
            <li className="table__header">
               <div className="row__col row__col-3"></div>

               <div className="row__col row__col-20">Zespół</div>
               <div className="row__col row__col-6">
                  <ThemedTooltip title="Rozegrane mecze">
                     <span>R.M.</span>
                  </ThemedTooltip>
               </div>
               <div className="row__col row__col-6">
                  <ThemedTooltip title="Punkty">
                     <span>Pkt.</span>
                  </ThemedTooltip>
               </div>
               <div className="row__col row__col-5">
                  <ThemedTooltip title="Zdobyte bramki">
                     <span>Z.B.</span>
                  </ThemedTooltip>
               </div>
               <div className="row__col row__col-5">
                  <ThemedTooltip title="Asysty">
                     <span>Ast.</span>
                  </ThemedTooltip>
               </div>
               <div className="row__col row__col-5">
                  <ThemedTooltip title="Obrony">
                     <span>Obr.</span>
                  </ThemedTooltip>
               </div>
               <div className="row__col row__col-5">
                  <ThemedTooltip title="Żółte kartki">
                     <span>Ż.K.</span>
                  </ThemedTooltip>
               </div>
               <div className="row__col row__col-10">
                  <ThemedTooltip title="Czerwone kartki">
                     <span>Cz.K.</span>
                  </ThemedTooltip>
               </div>
               <div className="row__col row__col-10">
                  <ThemedTooltip title="Zwycięstwa, Remisy, Porażki">
                     <span>Z.R.P.</span>
                  </ThemedTooltip>
               </div>
               <div className="row__col row__col-15">
                  <ThemedTooltip title="Procentowy stosunek Zwyciestw, Remisów, Porażek">
                     <span>Z%.R%.P%.</span>
                  </ThemedTooltip>
               </div>
               <div className="row__col row__col-10">
                  <ThemedTooltip title="Bramki">
                     <span>Br.</span>
                  </ThemedTooltip>
               </div>
            </li>

            <ThemedScrollDiv className="table__rows">
               {loading ? (
                  <Loader />
               ) : teamsStatisticsList?.length ? (
                  teamsStatisticsList?.map(
                     ({
                        id,
                        position,
                        shortName,
                        matchesPlayed,
                        points,
                        goalsScored,
                        assists,
                        saves,
                        yellowCards,
                        redCards,
                        matchResults,
                        percentageMatchResults,
                        goalsRatio,
                     }) => (
                        <li key={id} className="table__row">
                           <div className="row__col row__col-3" data-label="Pozycja">
                              {position}
                           </div>
                           <div className="row__col row__col-20" data-label="Zespół">
                              {shortName}
                           </div>
                           <div className="row__col row__col-6" data-label="Rozegrane mecze">
                              {matchesPlayed}
                           </div>
                           <div className="row__col row__col-6" data-label="Punkty">
                              {points}
                           </div>
                           <div className="row__col row__col-5" data-label="Zdobyte bramki">
                              {goalsScored}
                           </div>
                           <div className="row__col row__col-5" data-label="Asysty">
                              {assists}
                           </div>
                           <div className="row__col row__col-5" data-label="Obrony">
                              {saves}
                           </div>
                           <div className="row__col row__col-5" data-label="Żółte kartki">
                              {yellowCards}
                           </div>
                           <div className="row__col row__col-10" data-label="Czerwone kartki">
                              {redCards}
                           </div>
                           <div
                              className="row__col row__col-10"
                              data-label="Zwycięstwa, Remisy, Porażki"
                           >
                              {matchResults}
                           </div>
                           <div
                              className="row__col row__col-15"
                              data-label="Procentowy stosunek Zwyciestw, Remisów, Porażek"
                           >
                              {percentageMatchResults}
                           </div>
                           <div className="row__col row__col-10" data-label="Bramki">
                              {goalsRatio}
                           </div>
                        </li>
                     )
                  )
               ) : (
                  <li className="table__emptyState">Brak statystyk do wyświetlenia</li>
               )}
            </ThemedScrollDiv>
         </ul>
      </div>
   );
};

TeamsStatisticsTable.propTypes = {
   leagueGid: string,
};

export default memo(TeamsStatisticsTable);
