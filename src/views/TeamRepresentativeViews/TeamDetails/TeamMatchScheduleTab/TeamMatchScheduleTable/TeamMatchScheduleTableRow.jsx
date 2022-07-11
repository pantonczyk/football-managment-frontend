import React, { memo, useState, useMemo } from 'react';
import { format } from 'date-fns';
import { array, bool, number, object, string } from 'prop-types';

import Collapse from '@mui/material/Collapse';

import createMatchEventIcon from 'utils/createMatchEventIcon';

import ThemedIconButton from 'components/ThemedIconButton';
import ThemedTooltip from 'components/ThemedTooltip';

import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import KeyboardArrowUpIcon from '@mui/icons-material/KeyboardArrowUp';
import ChevronRightRoundedIcon from '@mui/icons-material/ChevronRightRounded';

import './TeamMatchScheduleTable.scss';

const TeamMatchScheduleTableRow = ({
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
}) => {
   const [isCollapse, setIsCollapse] = useState(false);

   const handleCollapseToggle = () => {
      isPlayed && setIsCollapse((prevState) => !prevState);
   };

   const matchDate = useMemo(() => {
      return format(new Date(date), 'dd/MM/yyyy HH:mm');
   }, [date]);

   const showResultMatch = (homeGoals, awayGoals, isPlayed) => {
      if (isPlayed) return `${homeGoals} - ${awayGoals}`;
      else return <span className="resultMatch-empty">-</span>;
   };

   return (
      <>
         <li className="table__row">
            <div className="row__col row__col-5">{round}</div>
            <div className="row__col row__col-15">{matchDate}</div>
            <div className="row__col row__col-35">
               {homeTeam?.shortName}
               <span className="resultMatch">
                  {showResultMatch(homeGoals, awayGoals, isPlayed)}
               </span>
               {awayTeam?.shortName}
            </div>
            <div className="row__col row__col-20">{stadium}</div>
            <div className="row__col row__col-20">{judge}</div>
            <div className="row__col row__col-5">
               <ThemedIconButton
                  aria-label="expand row"
                  size="small"
                  onClick={handleCollapseToggle}
               >
                  {isCollapse ? <KeyboardArrowUpIcon /> : <KeyboardArrowDownIcon />}
               </ThemedIconButton>
            </div>
         </li>

         <Collapse in={isCollapse} timeout="auto" unmountOnExit>
            <div className="row__collapse">
               <p className="collapse__header">Przebieg meczu</p>

               <div className="collapse__matchEventsList">
                  {matcheventSet?.length ? (
                     matcheventSet?.map(({ id, minute, team, player, typeName }) => (
                        <div key={id} className="matchEventsList__item">
                           <ChevronRightRoundedIcon style={{ color: '#757575' }} />
                           <span>{minute}'</span>
                           <span>{team?.shortName}</span>
                           <span>
                              {player?.firstName} {player?.lastName}
                           </span>

                           <ThemedTooltip placement="right" title={typeName?.name}>
                              <img
                                 src={createMatchEventIcon(typeName?.name)}
                                 alt="Ikona zdarzenia"
                                 className="item__imageEvent"
                              />
                           </ThemedTooltip>
                        </div>
                     ))
                  ) : (
                     <p className="matchEventsList__emptyState">Brak zdarzeń do wyświetlenia</p>
                  )}
               </div>
            </div>
         </Collapse>
      </>
   );
};

TeamMatchScheduleTableRow.propTypes = {
   round: number,
   date: string,
   homeTeam: object,
   awayTeam: object,
   stadium: string,
   judge: string,
   homeGoals: number,
   awayGoals: number,
   isPlayed: bool,
   matcheventSet: array,
};

export default memo(TeamMatchScheduleTableRow);
