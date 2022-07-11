import React, { useState, memo } from 'react';
import { useMutation } from '@apollo/client';
import { string } from 'prop-types';

import ASSIGN_TEAM_TO_LEAGUE from 'api/mutations/ASSIGN_TEAM_TO_LEAGUE';

import Loader from 'components/Loader';
import ThemedTextField from 'components/ThemedTextField';
import ThemedButton from 'components/ThemedButton';

import './AssignTeamToLeague.scss';

const AssignTeamToLeague = ({ teamGid }) => {
   const [leagueCode, setLeagueCode] = useState('');
   const [errorMessage, setErrorMessage] = useState('');

   const [assignTeamToLeagueMutation, { loading }] = useMutation(ASSIGN_TEAM_TO_LEAGUE);

   const assignTeamToLeague = () => {
      setErrorMessage('');
      assignTeamToLeagueMutation({
         variables: {
            teamGid,
            leagueCode,
         },
      }).catch((error) => setErrorMessage(error.message));
   };

   const handleAssignTeamToLeague = (values) => {
      assignTeamToLeague(values);
   };

   return (
      <div className="assignTeamToLeague">
         <div className="assignTeamToLeague__header">
            <h1>Zgłoś zespół do ligi</h1>
            <p>
               Wprowadź kod rejestracji do ligi otrzymany od organizatora i zatwierdź przyciskiem
               "Zarejestruj".
            </p>
         </div>
         <div className="assignTeamToLeague__form">
            <ThemedTextField
               variant="outlined"
               label="Kod rejestracji"
               name="leagueCode"
               className="form__input"
               type="text"
               value={leagueCode}
               onChange={(event) => setLeagueCode(event.target.value)}
            />
            <div className="form__button">
               <ThemedButton onClick={handleAssignTeamToLeague} disabled={loading}>
                  Zarejestruj
               </ThemedButton>
            </div>
            <div>
               {loading && <Loader />}
               <p className="form__errors">{errorMessage}</p>
            </div>
         </div>
      </div>
   );
};

AssignTeamToLeague.propTypes = {
   teamGid: string,
};

export default memo(AssignTeamToLeague);
