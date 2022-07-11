import React, { useState, useMemo, memo } from 'react';
import { useQuery } from '@apollo/client';

import GET_TEAMS_BY_LEAGUE_FILTERABLE from 'api/queries/GET_TEAMS_BY_LEAGUE_FILTERABLE';

import Loader from 'components/Loader';
import ThemedSearchTextField from 'components/ThemedSearchTextField';

import LeagueTeamCard from './LeagueTeamCard';

import './TeamsTab.scss';

const TeamsTab = ({ leagueGid }) => {
   const [teamsList, setTeamsList] = useState([]);
   const [teamsSearchFilter, setTeamsSearchFilter] = useState('');

   const handleSetTeamsSearchFilter = (e) => {
      setTeamsSearchFilter(e.target.value);
   };

   const { data, loading } = useQuery(GET_TEAMS_BY_LEAGUE_FILTERABLE, {
      variables: {
         leagueGid,
         searchPhrase: teamsSearchFilter,
      },
      fetchPolicy: 'cache-and-network',
   });

   useMemo(() => {
      setTeamsList(data?.filterableTeamsByLeague);
   }, [data]);

   return (
      <div className="teamsTab">
         <div className="teamsTab__header">
            <h1>Lista zespołów grających w lidze</h1>
         </div>
         <div className="teamsTab__filters">
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
            <div className="teamsTab__cards">
               {teamsList?.map(({ id, name, shortName, representative }) => (
                  <LeagueTeamCard
                     key={id}
                     leagueGid={leagueGid}
                     teamId={id}
                     name={name}
                     shortName={shortName}
                     representativeFirstName={representative?.firstName}
                     representativeLastName={representative?.lastName}
                  />
               ))}
            </div>
         ) : (
            <p className="teamsTab__emptyState">Brak drużyn do wyświetlenia</p>
         )}
      </div>
   );
};

export default memo(TeamsTab);
