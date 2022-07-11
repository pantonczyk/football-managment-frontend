import React, { useState, useMemo, lazy, Suspense } from 'react';
import { useParams, useHistory } from 'react-router-dom';
import { useQuery, useMutation } from '@apollo/client';
import { format } from 'date-fns';
import classNames from 'classnames';

import GET_MATCH from 'api/queries/GET_MATCH';
import SET_MATCH_AS_PLAYED from 'api/mutations/SET_MATCH_AS_PLAYED';

import useToggleVisibility from 'hooks/useToggleVisibility';
import useComponentVisibility from 'hooks/useComponentVisibility';

import { goBack } from 'utils/routerFunctions';

import useBreadcrumbs from 'components/Breadcrumbs/useBreadcrumbs';
import ThemedButton from 'components/ThemedButton';
import Loader from 'components/Loader';

import MatchEventsTable from './MatchEventsTable';
import ModalSetMatchAsPlayed from './ModalSetMatchAsPlayed';
const FormEditMatch = lazy(() => import('./FormEditMatch'));
const FormAddMatchEvent = lazy(() => import('./FormAddMatchEvent'));

import './LeagueMatchManage.scss';

const LeagueMatchManage = () => {
   const history = useHistory();
   const { matchGid } = useParams();
   const [errorMessage, setErrorMessage] = useState('');
   const [match, setMatch] = useState();
   const [isFormEditMatchVisible, handleFormEditMatchVisibility] = useToggleVisibility(false);
   const [isFormAddMatchEventVisible, handleFormAddMatchEventVisibility] =
      useToggleVisibility(false);
   const [
      isOpenModalSetMatchPlayed,
      handleOpenModalSetMatchPlayed,
      handleCloseModalSetMatchPlayed,
   ] = useComponentVisibility(false);
   const [setMatchAsPlayedMutation] = useMutation(SET_MATCH_AS_PLAYED);

   useBreadcrumbs(
      {
         replace: {
            [matchGid]: `${match?.homeTeam?.shortName} - ${match?.awayTeam?.shortName}`,
         },
      },
      [match]
   );

   const { data } = useQuery(GET_MATCH, {
      variables: {
         matchGid,
      },
   });

   useMemo(() => {
      setMatch(data?.match);
   }, [data]);

   const disableWhenMatchCompleted = useMemo(() => {
      return match?.isPlayed;
   }, [match]);

   const showErrorMessage = (error) => {
      setErrorMessage(error.message);
      handleCloseModalSetMatchPlayed();
   };

   const setMatchAsPlayed = () => {
      setErrorMessage('');
      setMatchAsPlayedMutation({
         variables: {
            matchGid,
         },
      })
         .then(handleCloseModalSetMatchPlayed)
         .catch(showErrorMessage);
   };

   const matchStatusClass = classNames(
      match?.isPlayed ? 'info__matchStatus--incompleted' : 'info__matchStatus--completed'
   );

   return (
      <>
         <div className="leagueMatchManage">
            <div className="leagueMatchManage__options">
               <ThemedButton
                  variant="outlined"
                  color="primary"
                  size="small"
                  onClick={goBack(history)}
               >
                  Powrót do terminarza ligi
               </ThemedButton>
            </div>

            {disableWhenMatchCompleted && (
               <div className="leagueMatchManage__matchStatus">
                  <p>Mecz został zakończony. Dalsza edycja danych meczu jest niemożliwa.</p>
               </div>
            )}

            <div className="leagueMatchManage__header">
               <h1>
                  Edycja meczu {match?.homeTeam?.shortName} - {match?.awayTeam?.shortName}
               </h1>

               <div className="header__buttons">
                  <ThemedButton
                     variant="outlined"
                     color="secondary"
                     className="header__button"
                     disabled={disableWhenMatchCompleted}
                     onClick={handleOpenModalSetMatchPlayed}
                  >
                     Zakończ mecz
                  </ThemedButton>

                  <ThemedButton
                     variant="contained"
                     color="primary"
                     className="header__button"
                     disabled={disableWhenMatchCompleted}
                     onClick={handleFormEditMatchVisibility}
                  >
                     Edytuj mecz
                  </ThemedButton>
               </div>
            </div>

            {errorMessage && (
               <div className="leagueMatchManage__errorMessage">
                  <p>{errorMessage}</p>
               </div>
            )}

            <div className="leagueMatchManage__formEditMatch">
               <Suspense
                  fallback={
                     <div className="form__loading">
                        <Loader />
                     </div>
                  }
               >
                  {isFormEditMatchVisible && (
                     <FormEditMatch
                        matchGid={matchGid}
                        date={match?.date}
                        judge={match?.judge}
                        stadium={match?.stadium}
                     />
                  )}
               </Suspense>
            </div>

            <div className="leagueMatchManage__match">
               <h2>Informacje o meczu</h2>

               <div className="match__overview">
                  <div className="overview__left">
                     <p className="match__info">
                        Drużyna gospodarzy: <span>{match?.homeTeam?.name}</span>
                     </p>
                     <p className="match__info">
                        Drużyna gości: <span>{match?.awayTeam?.name}</span>
                     </p>
                     <p className="match__info">
                        Status meczu:{' '}
                        <span className={matchStatusClass}>
                           {match?.isPlayed ? 'Zakończony' : 'Niezakończony'}
                        </span>
                     </p>
                     {match?.isPlayed && (
                        <p className="match__info">
                           Wynik meczu:{' '}
                           <span>
                              {match?.homeGoals} - {match?.awayGoals}{' '}
                           </span>
                        </p>
                     )}
                  </div>

                  <div className="overview__right">
                     <p className="match__info">
                        Data:{' '}
                        <span>{match && format(new Date(match?.date), 'dd-MM-yyyy HH:mm')}</span>
                     </p>
                     <p className="match__info">
                        Stadion: <span>{match?.stadium}</span>
                     </p>
                     <p className="match__info">
                        Sędzia: <span>{match?.judge}</span>
                     </p>
                  </div>
               </div>
            </div>

            <div className="leagueMatchManage__matchEvents">
               <div className="matchEvents__header">
                  <h2>Zdarzenia w meczu</h2>

                  <ThemedButton
                     variant="outlined"
                     color="primary"
                     className="header__button"
                     disabled={disableWhenMatchCompleted}
                     onClick={handleFormAddMatchEventVisibility}
                  >
                     Dodaj zdarzenie
                  </ThemedButton>
               </div>

               <div className="matchEvents__formAddEvent">
                  <Suspense
                     fallback={
                        <div className="form__loading">
                           <Loader />
                        </div>
                     }
                  >
                     {isFormAddMatchEventVisible && (
                        <FormAddMatchEvent
                           matchGid={matchGid}
                           homeTeam={match?.homeTeam}
                           awayTeam={match?.awayTeam}
                        />
                     )}
                  </Suspense>
               </div>

               <div className="matchEvents__table">
                  <MatchEventsTable
                     matchEventsList={match?.matcheventSet}
                     disabledActions={disableWhenMatchCompleted}
                  />
               </div>
            </div>
         </div>

         <ModalSetMatchAsPlayed
            open={isOpenModalSetMatchPlayed}
            handleClose={handleCloseModalSetMatchPlayed}
            setMatchAsPlayed={setMatchAsPlayed}
         />
      </>
   );
};

export default LeagueMatchManage;
