import React, { useState, useMemo, memo } from 'react';
import { useQuery } from '@apollo/client';
import { string } from 'prop-types';

import GET_LEAGUE_MATCHES from 'api/queries/GET_LEAGUE_MATCHES';

import ThemedSearchTextField from 'components/ThemedSearchTextField';
import ThemedAutocomplete from 'components/ThemedAutocomplete';
import ThemedScrollDiv from 'components/ThemedScrollDiv';
import Loader from 'components/Loader';

import LeagueScheduleTableRow from './LeagueScheduleTableRow';

import './LeagueScheduleTable.scss';

const LeagueScheduleTable = ({ leagueGid }) => {
   const [leagueMatchesList, setLeagueMatchesList] = useState([]);
   const [isPlayedMatchFilter, setIsPlayedMatchFilter] = useState();
   const [leagueMatchesSearchFilter, setLeagueMatchesSearchFilter] = useState('');
   const isPlayedMatchFilterOptions = ['Zakończone', 'Niezakończone'];

   const handleSetLeagueMatchesSearchFilter = (e) => {
      setLeagueMatchesSearchFilter(e.target.value);
   };

   const handleSetIsPlayedMatchFilter = (event, newValue) => {
      if (newValue === 'Zakończone') return setIsPlayedMatchFilter(true);
      else if (newValue === 'Niezakończone') return setIsPlayedMatchFilter(false);
      else return setIsPlayedMatchFilter(null);
   };

   const { data, loading } = useQuery(GET_LEAGUE_MATCHES, {
      variables: {
         leagueGid,
         searchPhrase: leagueMatchesSearchFilter,
         isPlayedFilter: isPlayedMatchFilter,
      },
      fetchPolicy: 'cache-and-network',
   });

   useMemo(() => {
      setLeagueMatchesList(data?.leagueMatches);
   }, [data]);

   return (
      <div className="leagueScheduleTable">
         <div className="leagueScheduleTable__filters">
            <ThemedSearchTextField
               id="teamsSearch"
               name="teamsSearchFilter"
               type="search"
               placeholder="Wyszukaj zespół"
               variant="outlined"
               onChange={handleSetLeagueMatchesSearchFilter}
               className="inputFilter"
               size="small"
            />
            <ThemedAutocomplete
               variant="outlined"
               name="isPlayedMatchFilter"
               label="Filtry"
               placeholder="Status meczu"
               onChange={handleSetIsPlayedMatchFilter}
               options={isPlayedMatchFilterOptions}
               wrapperClass="inputFilter"
               size="small"
            />
         </div>
         <ThemedScrollDiv orientation="horizontal">
            <ul className="leagueScheduleTable__table">
               <li className="table__header">
                  <div className="row__col row__col-4"></div>
                  <div className="row__col row__col-5">Runda</div>
                  <div className="row__col row__col-15">Data</div>
                  <div className="row__col row__col-35"></div>
                  <div className="row__col row__col-15">Stadion</div>
                  <div className="row__col row__col-22">Sędzia</div>
                  <div className="row__col row__col-4"></div>
               </li>

               {loading ? (
                  <Loader />
               ) : leagueMatchesList?.length ? (
                  leagueMatchesList?.map(
                     ({
                        id,
                        round,
                        date,
                        homeTeam,
                        awayTeam,
                        stadium,
                        judge,
                        homeGoals,
                        awayGoals,
                        isPlayed,
                        matcheventSet,
                     }) => (
                        <LeagueScheduleTableRow
                           key={id}
                           matchId={id}
                           round={round}
                           date={date}
                           homeTeam={homeTeam}
                           awayTeam={awayTeam}
                           stadium={stadium}
                           judge={judge}
                           homeGoals={homeGoals}
                           awayGoals={awayGoals}
                           isPlayed={isPlayed}
                           matcheventSet={matcheventSet}
                        />
                     )
                  )
               ) : (
                  <li className="table__emptyState">Brak meczy do wyświetlenia</li>
               )}
            </ul>
         </ThemedScrollDiv>
      </div>
   );
};

LeagueScheduleTable.propTypes = {
   leagueGid: string,
};

export default memo(LeagueScheduleTable);
