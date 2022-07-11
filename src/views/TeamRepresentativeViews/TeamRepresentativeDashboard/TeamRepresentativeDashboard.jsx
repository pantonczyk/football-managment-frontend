import React, { useState, useMemo } from 'react';
import { useQuery } from '@apollo/client';

import GET_TEAMS_BY_REPRESENTATIVE from 'api/queries/GET_TEAMS_BY_REPRESENTATIVE';

import Loader from 'components/Loader';
import ThemedSearchTextField from 'components/ThemedSearchTextField';

import TeamCard from './TeamCard';

import './TeamRepresentativeDashboard.scss';

const TeamRepresentativeDashboard = () => {
   const [teamsList, setTeamsList] = useState([]);
   const [teamsSearchFilter, setTeamsSearchFilter] = useState('');

   const handleSetTeamsSearchFilter = (e) => {
      setTeamsSearchFilter(e.target.value);
   };

   const { data, loading } = useQuery(GET_TEAMS_BY_REPRESENTATIVE, {
      variables: {
         searchPhrase: teamsSearchFilter,
      },
      fetchPolicy: 'cache-and-network',
   });

   useMemo(() => {
      setTeamsList(data?.teamsByRepresentative);
   }, [data]);

   return (
      <div className="teamRepresentativeDashboard">
         <div className="teamRepresentativeDashboard__header">
            <h1>Lista koordynowanych zespołów</h1>
         </div>
         <div className="teamRepresentativeDashboard__filters">
            <ThemedSearchTextField
               id="teamsSearch"
               name="teamsSearchInput"
               type="search"
               placeholder="Wyszukaj zespół"
               variant="outlined"
               onChange={handleSetTeamsSearchFilter}
               className="inputFilter"
               size="small"
            />
         </div>

         {loading ? (
            <Loader />
         ) : teamsList?.length ? (
            <div className="teamRepresentativeDashboard__cards">
               {teamsList?.map(({ id, name, shortName, league }) => (
                  <TeamCard
                     key={id}
                     id={id}
                     name={name}
                     shortName={shortName}
                     leagueName={league?.name}
                     organizerFirstName={league?.organizer?.firstName}
                     organizerLastName={league?.organizer?.lastName}
                  />
               ))}
            </div>
         ) : (
            <p className="teamRepresentativeDashboard__emptyState">Brak drużyn do wyświetlenia</p>
         )}
      </div>
   );
};

export default TeamRepresentativeDashboard;
