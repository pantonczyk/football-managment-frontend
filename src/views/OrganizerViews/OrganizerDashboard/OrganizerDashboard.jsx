import React, { useState, useMemo } from 'react';
import { useQuery } from '@apollo/client';

import GET_LEAGUES_LIST from 'api/queries/GET_LEAGUES_LIST';

import Loader from 'components/Loader';
import ThemedSearchTextField from 'components/ThemedSearchTextField';
import ThemedAutocomplete from 'components/ThemedAutocomplete';

import LeagueCard from './LeagueCard';

import './OrganizerDashboard.scss';

const OrganizerDashboard = () => {
   const [leaguesList, setLeaguesList] = useState([]);
   const [leagueSearchFilter, setLeagueSearchFilter] = useState('');
   const [isEndedFilter, setIsEndedFilter] = useState();

   const handleSetLeagueSearchFilter = (e) => {
      setLeagueSearchFilter(e.target.value);
   };

   const isEndedFilterOptions = ['Aktywne', 'Zakończone'];

   const handleSetIsEndedFilter = (event, newValue) => {
      if (newValue === 'Aktywne') return setIsEndedFilter(false);
      else if (newValue === 'Zakończone') return setIsEndedFilter(true);
      else return setIsEndedFilter(null);
   };

   const { data, loading } = useQuery(GET_LEAGUES_LIST, {
      variables: {
         searchPhrase: leagueSearchFilter,
         endedFilter: isEndedFilter,
      },
      fetchPolicy: 'cache-and-network',
   });

   useMemo(() => {
      setLeaguesList(data?.leagues);
   }, [data]);

   return (
      <div className="organizerDashboard">
         <div className="organizerDashboard__header">
            <h1>Lista rozgrywanych lig</h1>
         </div>

         <div className="organizerDashboard__filters">
            <ThemedSearchTextField
               id="leagueSearch"
               name="leagueSearchInput"
               type="search"
               placeholder="Wyszukaj ligę"
               variant="outlined"
               onChange={handleSetLeagueSearchFilter}
               className="inputFilter"
               size="small"
            />
            <ThemedAutocomplete
               variant="outlined"
               name="isEndedLeague"
               label="Filtry"
               placeholder="Status rozgrywek"
               onChange={handleSetIsEndedFilter}
               options={isEndedFilterOptions}
               wrapperClass="inputFilter"
               size="small"
            />
         </div>

         {loading ? (
            <Loader />
         ) : leaguesList?.length ? (
            <div className="organizerDashboard__cards">
               {leaguesList?.map(({ id, name, shortName, teamsCount, leagueSize, isEnded }) => (
                  <LeagueCard
                     key={id}
                     id={id}
                     name={name}
                     shortName={shortName}
                     teamsCount={teamsCount}
                     leagueSize={leagueSize}
                     isEnded={isEnded}
                  />
               ))}
            </div>
         ) : (
            <p className="organizerDashboard__emptyState">Brak lig do wyświetlenia</p>
         )}
      </div>
   );
};

export default OrganizerDashboard;
