import React, { memo } from 'react';
import { array } from 'prop-types';

import ThemedScrollDiv from 'components/ThemedScrollDiv';
import Loader from 'components/Loader';

import TeamMatchScheduleTableRow from './TeamMatchScheduleTableRow';

import './TeamMatchScheduleTable.scss';

const TeamMatchScheduleTable = ({ teamMatchesList, loadingData }) => {
   return (
      <div className="teamMatchScheduleTable">
         <ThemedScrollDiv orientation="horizontal">
            <ul className="teamMatchScheduleTable__table">
               <li className="table__header">
                  <div className="row__col row__col-5">Runda</div>
                  <div className="row__col row__col-15">Data</div>
                  <div className="row__col row__col-35"></div>
                  <div className="row__col row__col-20">Stadion</div>
                  <div className="row__col row__col-20">Sędzia</div>
                  <div className="row__col row__col-5"></div>
               </li>

               {loadingData ? (
                  <Loader />
               ) : teamMatchesList?.length ? (
                  teamMatchesList?.map(
                     ({
                        id,
                        round,
                        date,
                        homeTeam,
                        awayTeam,
                        stadium,
                        judge,
                        homeGoals,
                        awayGoals,
                        isPlayed,
                        matcheventSet,
                     }) => (
                        <TeamMatchScheduleTableRow
                           key={id}
                           round={round}
                           date={date}
                           homeTeam={homeTeam}
                           awayTeam={awayTeam}
                           stadium={stadium}
                           judge={judge}
                           homeGoals={homeGoals}
                           awayGoals={awayGoals}
                           isPlayed={isPlayed}
                           matcheventSet={matcheventSet}
                        />
                     )
                  )
               ) : (
                  <li className="table__emptyState">Brak meczy do wyświetlenia</li>
               )}
            </ul>
         </ThemedScrollDiv>
      </div>
   );
};

TeamMatchScheduleTable.propTypes = {
   teamMatchesList: array,
};

export default memo(TeamMatchScheduleTable);
