import React, { useState, useMemo, memo } from 'react';
import { useQuery } from '@apollo/client';
import { string } from 'prop-types';

import GET_TEAM_MATCHES from 'api/queries/GET_TEAM_MATCHES';

import ThemedAutocomplete from 'components/ThemedAutocomplete';

import TeamMatchScheduleTable from './TeamMatchScheduleTable';

import './TeamMatchScheduleTab.scss';

const TeamMatchScheduleTab = ({ teamGid }) => {
   const [teamMatchesList, setTeamMatchesList] = useState([]);
   const [isPlayedMatchFilter, setIsPlayedMatchFilter] = useState();

   const isPlayedMatchFilterOptions = ['Rozegrane', 'Nierozegrane'];

   const handleSetIsPlayedMatchFilter = (event, newValue) => {
      if (newValue === 'Rozegrane') return setIsPlayedMatchFilter(true);
      else if (newValue === 'Nierozegrane') return setIsPlayedMatchFilter(false);
      else return setIsPlayedMatchFilter(null);
   };

   const { data, loading } = useQuery(GET_TEAM_MATCHES, {
      variables: {
         teamGid,
         isPlayedFilter: isPlayedMatchFilter,
      },
      fetchPolicy: 'cache-and-network',
   });

   useMemo(() => {
      setTeamMatchesList(data?.teamMatches);
   }, [data]);

   return (
      <div className="teamMatchScheduleTab">
         <div className="teamMatchScheduleTab__header">
            <h1>Terminarz rozgrywek</h1>

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

         <div className="teamMatchScheduleTab__table">
            <TeamMatchScheduleTable teamMatchesList={teamMatchesList} loadingData={loading} />
         </div>
      </div>
   );
};

TeamMatchScheduleTab.propTypes = {
   teamGid: string,
};

export default memo(TeamMatchScheduleTab);
