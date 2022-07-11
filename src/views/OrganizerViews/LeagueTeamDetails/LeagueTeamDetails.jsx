import React, { useState, useMemo } from 'react';
import { useParams, useHistory } from 'react-router-dom';
import { useQuery } from '@apollo/client';

import GET_LEAGUE_TEAM from 'api/queries/GET_LEAGUE_TEAM';
import GET_PLAYERS_BY_TEAM from 'api/queries/GET_PLAYERS_BY_TEAM';

import { goBack } from 'utils/routerFunctions';

import useBreadcrumbs from 'components/Breadcrumbs/useBreadcrumbs';
import ThemedButton from 'components/ThemedButton';
import ThemedSearchTextField from 'components/ThemedSearchTextField';

import TeamPlayerCard from './TeamPlayerCard';

import './LeagueTeamDetails.scss';

const LeagueTeamDetails = () => {
   const history = useHistory();
   const [teamData, setTeamData] = useState(null);
   const [teamPlayersList, setPlayersList] = useState([]);
   const [playerSearchFilter, setPlayerSearchFilter] = useState('');
   const { teamGid } = useParams();

   const handleSetPlayerSearchFilter = (e) => {
      setPlayerSearchFilter(e.target.value);
   };

   const { data: dataLeagueTeam } = useQuery(GET_LEAGUE_TEAM, {
      variables: {
         teamGid,
      },
   });

   const { data: dataTeamPlayers } = useQuery(GET_PLAYERS_BY_TEAM, {
      variables: {
         teamGid,
         searchPhrase: playerSearchFilter,
      },
   });

   useMemo(() => {
      setTeamData(dataLeagueTeam?.team);
      setPlayersList(dataTeamPlayers?.playersByTeam);
   }, [dataLeagueTeam, dataTeamPlayers]);

   useBreadcrumbs(
      {
         replace: {
            [teamGid]: teamData?.shortName,
         },
      },
      [teamData]
   );

   const {
      name = '',
      shortName = '',
      position = '',
      won = '',
      draw = '',
      lost = '',
      goalsScored = '',
      goalsLost = '',
      goalsDiff = '',
      points = '',
      representative = {},
   } = teamData || {};

   return (
      <div className="leagueTeamDetails">
         <div className="leagueTeamDetails__buttons">
            <ThemedButton variant="outlined" color="primary" onClick={goBack(history)} size="small">
               Powrót do listy zespołów
            </ThemedButton>
         </div>

         <div className="leagueTeamDetails__header">
            <h1>Informacje o zespole</h1>
         </div>

         <div className="leagueTeamDetails__team">
            <div className="team__info">
               <h2>Dane zespołu</h2>
               <p className="info__text">
                  Nazwa zespołu: <span>{name}</span>
               </p>
               <p className="info__text">
                  Skrócona nazwa zespołu: <span>{shortName}</span>
               </p>

               <h2>Dane reprezentanta</h2>
               <p className="info__text">
                  Imię i nazwisko:{' '}
                  <span>
                     {representative?.firstName} {representative?.lastName}
                  </span>
               </p>
               <p className="info__text">
                  Adres email: <span>{representative?.email}</span>
               </p>
            </div>

            <div className="team__statistisc">
               <h2>Statystyki zespołu w lidze</h2>
               <p className="info__text">
                  Pozycja w lidze: <span>{position}</span>
               </p>
               <p className="info__text">
                  Wygrane mecze: <span>{won}</span>
               </p>
               <p className="info__text">
                  Zremisowane mecze: <span>{draw}</span>
               </p>
               <p className="info__text">
                  Przegrane mecze: <span>{lost}</span>
               </p>
               <p className="info__text">
                  Zdobyte bramki: <span>{goalsScored}</span>
               </p>
               <p className="info__text">
                  Stracone bramki: <span>{goalsLost}</span>
               </p>
               <p className="info__text">
                  Roźnica bramek: <span>{goalsDiff}</span>
               </p>
               <p className="info__text">
                  Zdobyte punkty: <span>{points}</span>
               </p>
            </div>
         </div>

         <div className="leagueTeamDetails__players">
            <div className="players__header">
               <h1>Skład zespołu</h1>
            </div>

            <div className="players__filters">
               <ThemedSearchTextField
                  id="playerSearch"
                  name="playerSearchFilter"
                  type="search"
                  placeholder="Wyszukaj gracza"
                  variant="outlined"
                  onChange={handleSetPlayerSearchFilter}
                  className="inputFilter"
                  size="small"
                  value={playerSearchFilter}
               />
            </div>
            {teamPlayersList?.length ? (
               <div className="players__cards">
                  {teamPlayersList?.map(
                     ({ id, firstName, lastName, playerNumber, photo, position }) => (
                        <TeamPlayerCard
                           key={id}
                           playerId={id}
                           firstName={firstName}
                           lastName={lastName}
                           playerNumber={playerNumber}
                           photo={photo}
                           playerPosition={position?.name}
                        />
                     )
                  )}
               </div>
            ) : (
               <p className="players__emptyState">Brak zawodników do wyświetlenia</p>
            )}
         </div>
      </div>
   );
};

export default LeagueTeamDetails;
