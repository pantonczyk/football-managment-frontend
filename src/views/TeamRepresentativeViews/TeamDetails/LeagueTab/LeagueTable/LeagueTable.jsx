import React, { memo, useState, useMemo } from 'react';
import { useQuery } from '@apollo/client';
import { string } from 'prop-types';

import GET_TEAMS_BY_LEAGUE from 'api/queries/GET_TEAMS_BY_LEAGUE';

import convertIdToGid from 'utils/convertIdToGid';

import ThemedTooltip from 'components/ThemedTooltip';
import Loader from 'components/Loader';

import TeamInfoModal from '../TeamInfoModal';

import './LeagueTable.scss';

const LeagueTable = ({ leagueId, teamGid }) => {
   const [leagueStanding, setLeagueStanding] = useState();
   const [isOpenTeamInfoModal, setIsOpenTeamInfoModal] = useState(false);
   const [selectedOpponentTeamGid, setSelectedOpponentTeamGid] = useState('');
   const leagueGid = convertIdToGid('LeagueNode', leagueId);

   const handleOpenTeamInfoModal = (opponentTeamId) => () => {
      setSelectedOpponentTeamGid(convertIdToGid('TeamNode', opponentTeamId));
      setIsOpenTeamInfoModal(true);
   };

   const handleCloseTeamInfoModal = () => {
      setIsOpenTeamInfoModal(false);
   };

   const { data, loading } = useQuery(GET_TEAMS_BY_LEAGUE, {
      variables: {
         leagueGid,
      },
      fetchPolicy: 'cache-and-network',
   });

   useMemo(() => {
      setLeagueStanding(data?.teamsByLeague);
   }, [data]);

   return (
      <>
         <div className="leagueTable">
            <div className="leagueTable__header">
               <h1>Tabela ligowa</h1>
            </div>
            <ul className="leagueTable__table">
               <li className="table__header">
                  <div className="row__col row__col-60">Zespół</div>
                  <div className="row__col row__col-5">
                     <ThemedTooltip title="Rozegrane mecze">
                        <span>RM</span>
                     </ThemedTooltip>
                  </div>
                  <div className="row__col row__col-5">
                     <ThemedTooltip title="Wygrane">
                        <span>W</span>
                     </ThemedTooltip>
                  </div>
                  <div className="row__col row__col-5">
                     <ThemedTooltip title="Remisy">
                        <span>R</span>
                     </ThemedTooltip>
                  </div>
                  <div className="row__col row__col-5">
                     <ThemedTooltip title="Przegrane">
                        <span>P</span>
                     </ThemedTooltip>
                  </div>
                  <div className="row__col row__col-5">
                     <ThemedTooltip title="Bramki zdobyte">
                        <span>BZ</span>
                     </ThemedTooltip>
                  </div>
                  <div className="row__col row__col-5">
                     <ThemedTooltip title="Bramki stracone">
                        <span>BS</span>
                     </ThemedTooltip>
                  </div>
                  <div className="row__col row__col-5">
                     <ThemedTooltip title="Różnica bramek">
                        <span>RB</span>
                     </ThemedTooltip>
                  </div>
                  <div className="row__col row__col-5">
                     <ThemedTooltip title="Punkty">
                        <span>Pkt.</span>
                     </ThemedTooltip>
                  </div>
               </li>

               {loading ? (
                  <Loader />
               ) : leagueStanding?.length ? (
                  leagueStanding?.map(
                     ({
                        id,
                        position,
                        shortName,
                        matchesPlayed,
                        won,
                        draw,
                        lost,
                        goalsScored,
                        goalsLost,
                        goalsDiff,
                        points,
                     }) => (
                        <li key={id} className="table__row" onClick={handleOpenTeamInfoModal(id)}>
                           <div className="row__col row__col-60" data-label="Pozycja w lidze">
                              {position}. {shortName}
                           </div>
                           <div className="row__col row__col-5" data-label="Rozegrane mecze">
                              {matchesPlayed}
                           </div>
                           <div className="row__col row__col-5" data-label="Wygrane">
                              {won}
                           </div>
                           <div className="row__col row__col-5" data-label="Remisy">
                              {draw}
                           </div>
                           <div className="row__col row__col-5" data-label="Przegrane">
                              {lost}
                           </div>
                           <div className="row__col row__col-5" data-label="Bramki zdobyte">
                              {goalsScored}
                           </div>
                           <div className="row__col row__col-5" data-label="Bramki stracone">
                              {goalsLost}
                           </div>
                           <div className="row__col row__col-5" data-label="Różnica bramek">
                              {goalsDiff}
                           </div>
                           <div className="row__col row__col-5" data-label="Punkty">
                              {points}
                           </div>
                        </li>
                     )
                  )
               ) : (
                  <li className="table__emptyState">Brak statystyk do wyświetlenia</li>
               )}
            </ul>
         </div>
         <TeamInfoModal
            open={isOpenTeamInfoModal}
            handleClose={handleCloseTeamInfoModal}
            teamGid={teamGid}
            opponentTeamGid={selectedOpponentTeamGid}
         />
      </>
   );
};

LeagueTable.propTypes = {
   leagueId: string,
   teamGid: string,
};

export default memo(LeagueTable);
