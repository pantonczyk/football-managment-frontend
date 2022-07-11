import React, { memo, useState, useMemo } from 'react';
import { useQuery } from '@apollo/client';
import { string } from 'prop-types';

import GET_PLAYERS_STATISTICS_BY_LEAGUE from 'api/queries/GET_PLAYERS_STATISTICS_BY_LEAGUE';

import Loader from 'components/Loader';
import ThemedSelect from 'components/ThemedSelect';
import ThemedScrollDiv from 'components/ThemedScrollDiv';

import './PlayersStatisticsTable.scss';

const statisticsFiltersOptions = [
   {
      id: 'goals',
      name: 'Najwięcej strzelonych bramek',
   },
   {
      id: 'assists',
      name: 'Najwięcej asyst',
   },
   {
      id: 'saves',
      name: 'Najwięcej obron',
   },
   {
      id: 'yellow_cards',
      name: 'Najwięcej żółtych kartek',
   },
   {
      id: 'red_cards',
      name: 'Najwięcej czerwonych kartek',
   },
];

const PlayersStatisticsTable = ({ leagueGid }) => {
   const [playersStatisticsList, setPlayerStatisticsList] = useState([]);
   const [statisticsFilters, setStatisticsFilters] = useState(
      statisticsFiltersOptions[0]?.id || ''
   );

   const handleSetStatisticsFilters = (e) => {
      setStatisticsFilters(e.target.value);
   };

   const { data, loading } = useQuery(GET_PLAYERS_STATISTICS_BY_LEAGUE, {
      variables: {
         leagueGid,
         filterPhrase: statisticsFilters,
      },
      fetchPolicy: 'cache-and-network',
   });

   useMemo(() => {
      setPlayerStatisticsList(data?.playersByLeague);
   }, [data]);

   return (
      <div className="playersStatisticsTable">
         <div className="playersStatisticsTable__header">
            <h1>Statystyki zawodników w lidze</h1>

            <ThemedSelect
               variant="outlined"
               size="small"
               wrapperClass="inputFilter"
               label="Rodzaj sortowania"
               name="statisticsFilter"
               menuItemsList={statisticsFiltersOptions}
               propsToMapValue="id"
               propsToMapName="name"
               onChange={handleSetStatisticsFilters}
               value={statisticsFilters}
               disabled={loading}
            />
         </div>
         <ThemedScrollDiv orientation="horizontal">
            <ul className="playersStatisticsTable__table">
               <li className="table__header">
                  <div className="row__col row__col-3">Lp.</div>
                  <div className="row__col row__col-20">Imię i nazwisko</div>
                  <div className="row__col row__col-20">Zespół</div>
                  <div className="row__col row__col-10">Pozycja</div>
                  <div className="row__col row__col-5">Gole</div>
                  <div className="row__col row__col-7">Asysty</div>
                  <div className="row__col row__col-7">Obrony</div>
                  <div className="row__col row__col-14">Żółte kartki</div>
                  <div className="row__col row__col-14">Czerwone kartki</div>
               </li>

               <ThemedScrollDiv className="table__rows">
                  {loading ? (
                     <Loader />
                  ) : playersStatisticsList?.length ? (
                     playersStatisticsList?.map(
                        (
                           {
                              id,
                              firstName,
                              lastName,
                              team,
                              position,
                              goals,
                              assists,
                              saves,
                              yellowCards,
                              redCards,
                           },
                           index
                        ) => (
                           <li key={id} className="table__row">
                              <div className="row__col row__col-3" data-label="Lp.">
                                 {index + 1}
                              </div>
                              <div className="row__col row__col-20" data-label="Imię i nazwisko">
                                 {firstName} {lastName}
                              </div>
                              <div className="row__col row__col-20" data-label="Zespół">
                                 {team?.shortName}
                              </div>
                              <div className="row__col row__col-10" data-label="Pozycja">
                                 {position?.name}
                              </div>
                              <div className="row__col row__col-5" data-label="Gole">
                                 {goals}
                              </div>
                              <div className="row__col row__col-7" data-label="Asysty">
                                 {assists}
                              </div>
                              <div className="row__col row__col-7" data-label="Obrony">
                                 {saves}
                              </div>
                              <div className="row__col row__col-14" data-label="Żółte kartki">
                                 {yellowCards}
                              </div>
                              <div className="row__col row__col-14" data-label="Czerwone kartki">
                                 {redCards}
                              </div>
                           </li>
                        )
                     )
                  ) : (
                     <li className="table__emptyState">Brak statystyk do wyświetlenia</li>
                  )}
               </ThemedScrollDiv>
            </ul>
         </ThemedScrollDiv>
      </div>
   );
};

PlayersStatisticsTable.propTypes = {
   leagueGid: string,
};

export default memo(PlayersStatisticsTable);
