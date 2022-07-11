import React, { useState, useMemo, memo } from 'react';
import { useHistory } from 'react-router-dom';
import { useQuery } from '@apollo/client';
import { string } from 'prop-types';

import GET_LEAGUE from 'api/queries/GET_LEAGUE';

import { redirectTo } from 'utils/routerFunctions';

import ThemedButton from 'components/ThemedButton';

import LeagueScheduleTable from './LeagueScheduleTable';

import './LeagueScheduleTab.scss';

const LeagueScheduleTab = ({ leagueGid }) => {
   const history = useHistory();
   const [league, setLeague] = useState(null);

   const { data } = useQuery(GET_LEAGUE, {
      variables: {
         leagueGid,
      },
   });

   useMemo(() => {
      setLeague(data?.league);
   }, [data]);

   return (
      <div className="leagueScheduleTab">
         <div className="leagueScheduleTab__header">
            <h1>Terminarz ligi</h1>
         </div>

         {league?.matchSet.length ? (
            <div className="leagueScheduleTab__table">
               <LeagueScheduleTable leagueGid={leagueGid} />
            </div>
         ) : (
            <div className="leagueScheduleTab__emptyState">
               <h2>Brak meczy do wyświetlenia</h2>
               <p>
                  Aby rozpocząć proces generowania terminarza rozgrywek przejdź do zakładki
                  "Zarządzanie ligą" lub kliknij poniższy przycisk
               </p>
               <ThemedButton
                  variant="contained"
                  color="primary"
                  className="emptyState__button"
                  onClick={redirectTo(
                     history,
                     `/league-organizer/leagues/${leagueGid}/league-manage`
                  )}
               >
                  Przejdź do zarządzania ligą
               </ThemedButton>
            </div>
         )}
      </div>
   );
};

LeagueScheduleTab.propTypes = {
   leagueGid: string,
};

export default memo(LeagueScheduleTab);
