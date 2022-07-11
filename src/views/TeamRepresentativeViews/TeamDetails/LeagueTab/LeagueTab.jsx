import React, { useState, useMemo } from 'react';
import { useParams } from 'react-router-dom';
import { useQuery } from '@apollo/client';

import GET_TEAM from 'api/queries/GET_TEAM';

import Loader from 'components/Loader';
import AssignTeamToLeague from './AssignTeamToLeague';
import LeagueTable from './LeagueTable';

import './LeagueTab.scss';

const LeagueTab = () => {
   const [teamData, setTeamData] = useState();

   const { teamGid } = useParams();

   const { data, loading } = useQuery(GET_TEAM, {
      variables: {
         teamGid,
      },
   });

   useMemo(() => {
      setTeamData(data?.team);
   }, [data]);

   if (loading) {
      return <Loader />;
   }

   const {
      position = '',
      won = '',
      draw = '',
      lost = '',
      goalsScored = '',
      goalsLost = '',
      goalsDiff = '',
      points = '',
      league = {},
   } = teamData || {};

   const leagueStatus = useMemo(() => {
      return league?.isEnded ? 'Zakończone' : 'Aktywne';
   }, [league?.isEnded]);

   return (
      <>
         {teamData?.league === null ? (
            <AssignTeamToLeague teamGid={teamGid} />
         ) : (
            <div className="leagueTab">
               <div className="leagueTab__info">
                  <div className="info__league">
                     <h2>Informacje o lidze</h2>
                     <p className="info__text">
                        Nazwa ligi: <span>{league?.name}</span>
                     </p>
                     <p className="info__text">
                        Skrócona nazwa ligi: <span>{league?.shortName}</span>
                     </p>
                     <p className="info__text info__text-justify">
                        Opis ligi: <span>{league?.description}</span>
                     </p>
                     <p className="info__text">
                        Liczba zespołów: <span>{league?.teamsCount}</span>
                     </p>
                     <p className="info__text">
                        Status rozgrywek: <span>{leagueStatus}</span>
                     </p>
                     <h2>Dane organizatora</h2>
                     <p className="info__text">
                        Imię i nazwisko:{' '}
                        <span>
                           {league?.organizer?.firstName} {league?.organizer?.lastName}
                        </span>
                     </p>
                     <p className="info__text">
                        Email: <span>{league?.organizer?.email}</span>
                     </p>
                  </div>

                  <div className="info__teamStats">
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

               <div className="leagueTab__table">
                  <LeagueTable leagueId={league?.id} teamGid={teamGid} />
               </div>
            </div>
         )}
      </>
   );
};

export default LeagueTab;
