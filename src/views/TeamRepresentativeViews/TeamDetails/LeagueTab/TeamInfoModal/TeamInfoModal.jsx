import React, { memo, useState, useMemo, useEffect } from 'react';
import { useLazyQuery } from '@apollo/client';
import { bool, func, string } from 'prop-types';

import GET_OPPONENT_TEAM_INFO from 'api/queries/GET_OPPONENT_TEAM_INFO';

import Modal from '@mui/material/Modal';
import CloseRoundedIcon from '@mui/icons-material/CloseRounded';

import ThemedIconButton from 'components/ThemedIconButton';
import ThemedTooltip from 'components/ThemedTooltip';
import Loader from 'components/Loader';

import './TeamInfoModal.scss';

const TeamInfoModal = ({ open, handleClose, teamGid, opponentTeamGid }) => {
   const [opponentTeamInfo, setOpponentTeamInfo] = useState();
   const [getOpponentTeamInfo, { data, loading }] = useLazyQuery(GET_OPPONENT_TEAM_INFO, {
      variables: {
         teamGid,
         opponentGid: opponentTeamGid,
      },
   });

   useEffect(() => {
      open && getOpponentTeamInfo();
   }, [open]);

   useMemo(() => {
      return setOpponentTeamInfo(data?.opponent);
   }, [data]);

   return (
      <Modal open={open} onClose={handleClose} keepMounted>
         <div className="teamInfoModal">
            <div className="teamInfoModal__header">
               <h1>Informacje o zespole</h1>

               <ThemedIconButton
                  ariaLabel="Zamknij"
                  size="medium"
                  color="primary"
                  onClick={handleClose}
               >
                  <ThemedTooltip title="Zamknij">
                     <CloseRoundedIcon fontSize="medium" />
                  </ThemedTooltip>
               </ThemedIconButton>
            </div>
            {loading ? (
               <Loader />
            ) : (
               <div className="teamInfoModal__content">
                  <p className="content__teamName">
                     Nazwa zespołu: <span>{opponentTeamInfo?.name}</span>
                  </p>

                  <div className="content__teamRepresentative">
                     <p className="teamRepresentative__header">Reprezentant zespołu</p>
                     <p>
                        Imię i nazwisko:{' '}
                        <span>
                           {opponentTeamInfo?.representative?.firstName}{' '}
                           {opponentTeamInfo?.representative?.lastName}
                        </span>
                     </p>
                     <p>
                        Email: <span>{opponentTeamInfo?.representative?.email}</span>
                     </p>
                  </div>
               </div>
            )}
         </div>
      </Modal>
   );
};

TeamInfoModal.propTypes = {
   open: bool,
   handleClose: func,
   teamId: string,
   opponentTeamId: string,
};

export default memo(TeamInfoModal);
