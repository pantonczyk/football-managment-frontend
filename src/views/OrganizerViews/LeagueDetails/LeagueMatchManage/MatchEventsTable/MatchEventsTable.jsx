import React, { memo, useState } from 'react';
import classNames from 'classnames';
import { useMutation } from '@apollo/client';
import { array, bool } from 'prop-types';

import REMOVE_MATCH_EVENT from 'api/mutations/REMOVE_MATCH_EVENT';

import convertIdToGid from 'utils/convertIdToGid';

import ThemedIconButton from 'components/ThemedIconButton';
import ThemedButton from 'components/ThemedButton';
import ThemedTooltip from 'components/ThemedTooltip';

import DeleteRoundedIcon from '@mui/icons-material/DeleteRounded';

import './MatchEventsTable.scss';

const MatchEventsTable = ({ matchEventsList, disabledActions }) => {
   const [errorMessage, setErrorMessage] = useState('');
   const [removeMatchEventMutation] = useMutation(REMOVE_MATCH_EVENT);

   const removeMatchEvent = (matchEventId) => () => {
      const matchEventGid = convertIdToGid('MatchEventNode', matchEventId);

      removeMatchEventMutation({
         variables: {
            matchEventGid,
         },
         refetchQueries: ['GET_MATCH'],
      }).catch((error) => setErrorMessage(error.message));
   };

   const deleteIconClass = classNames(
      disabledActions ? 'delete__icon--disabled' : 'delete__icon--enabled'
   );

   return (
      <div className="matchEventsTable">
         {errorMessage && (
            <div className="matchEventsTable__errorMessage">
               <p>{errorMessage}</p>
            </div>
         )}

         <ul className="matchEventsTable__table">
            <li className="table__header">
               <div className="row__col row__col-5">Minuta</div>
               <div className="row__col row__col-30">Zespół</div>
               <div className="row__col row__col-30">Zawodnik</div>
               <div className="row__col row__col-30">Rodzaj zdarzenia</div>
               <div className="row__col row__col-5"></div>
            </li>

            {matchEventsList?.length ? (
               matchEventsList?.map(({ id, minute, team, player, typeName }) => (
                  <li key={id} className="table__row">
                     <div className="row__col row__col-5" data-label="Minuta">
                        {minute}'
                     </div>
                     <div className="row__col row__col-30" data-label="Zespół">
                        {team?.shortName}
                     </div>
                     <div className="row__col row__col-30" data-label="Zawodnik">
                        {player?.firstName} {player?.lastName}
                     </div>
                     <div className="row__col row__col-30" data-label="Rodzaj zdarzenia">
                        {typeName.name}
                     </div>
                     <div className="row__col row__col-5 row__coll-options">
                        <ThemedIconButton
                           size="small"
                           color="error"
                           disabled={disabledActions}
                           onClick={removeMatchEvent(id)}
                        >
                           <ThemedTooltip title="Usuń zdarzenie">
                              <DeleteRoundedIcon className={deleteIconClass} />
                           </ThemedTooltip>
                        </ThemedIconButton>
                     </div>

                     <div className="row__col--mobileOptions">
                        <ThemedButton
                           variant="outlined"
                           color="secondary"
                           size="small"
                           className="mobileOption"
                           disabled={disabledActions}
                           onClick={removeMatchEvent(id)}
                        >
                           Usuń zdarzenie
                        </ThemedButton>
                     </div>
                  </li>
               ))
            ) : (
               <li className="table__emptyState">Brak zdarzeń do wyświetlenia</li>
            )}
         </ul>
      </div>
   );
};

MatchEventsTable.propTypes = {
   matchEventsList: array,
   disabledActions: bool,
};

export default memo(MatchEventsTable);
