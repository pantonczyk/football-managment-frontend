import React, { useState, useMemo } from 'react';
import { useQuery } from '@apollo/client';
import { string } from 'prop-types';

import GET_LEAGUE from 'api/queries/GET_LEAGUE';

import LeagueJoinCode from './LeagueJoinCode';
import FormEditLeague from './FormEditLeague';

import './LeagueOverviewTab.scss';

const LeagueOverviewTab = ({ leagueGid }) => {
   const [leagueData, setLeagueData] = useState();

   const leagueStatus = useMemo(() => {
      return leagueData?.isEnded ? 'Zakończone' : 'Aktywne';
   }, [leagueData?.isEnded]);

   const { data } = useQuery(GET_LEAGUE, {
      variables: {
         leagueGid,
      },
   });

   useMemo(() => {
      setLeagueData(data?.league);
   }, [data]);

   return (
      <div className="leagueOverviewTab">
         <div className="leagueOverviewTab__header">
            <h1>Informacje o lidze</h1>
            <LeagueJoinCode leagueCode={leagueGid} />
         </div>
         <div className="leagueOverviewTab__info">
            <div className="info__basic">
               <p className="info__text">
                  Nazwa ligi: <span>{leagueData?.name}</span>
               </p>
               <p className="info__text">
                  Skrócona nazwa ligi: <span>{leagueData?.shortName}</span>
               </p>
               <p className="info__text info__text-justify">
                  Opis ligi: <span>{leagueData?.description}</span>
               </p>
            </div>

            <div className="info__details">
               <p className="info__text">
                  Liczba zespołów w lidze:{' '}
                  <span>
                     {leagueData?.teamsCount}/{leagueData?.leagueSize}
                  </span>
               </p>

               {leagueData?.isSplit ? (
                  <>
                     <p className="info__text">
                        Data rozpoczęcia pierwszej rundy:{' '}
                        <span>{leagueData?.splitOneStartDate}</span>
                     </p>
                     <p className="info__text">
                        Data rozpoczęcia drugiej rundy: <span>{leagueData?.splitTwoStartDate}</span>
                     </p>
                  </>
               ) : (
                  <p className="info__text">
                     Data rozpoczęcia rozgrywek: <span>{leagueData?.splitOneStartDate}</span>
                  </p>
               )}

               <p className="info__text">
                  Status rozgrywek: <span>{leagueStatus}</span>
               </p>
            </div>
         </div>
         <div className="leagueOverviewTab__editForm">
            <FormEditLeague leagueGid={leagueGid} leagueData={leagueData} />
         </div>
      </div>
   );
};

LeagueOverviewTab.propTypes = {
   leagueGid: string,
};

export default LeagueOverviewTab;
