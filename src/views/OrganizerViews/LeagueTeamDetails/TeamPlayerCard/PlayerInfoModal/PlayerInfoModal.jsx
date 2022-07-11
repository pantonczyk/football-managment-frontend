import React, { memo, useState, useMemo } from 'react';
import { useQuery } from '@apollo/client';
import { bool, func, string } from 'prop-types';

import GET_PLAYER from 'api/queries/GET_PLAYER';

import convertIdToGid from 'utils/convertIdToGid';

import Modal from '@mui/material/Modal';
import CloseRoundedIcon from '@mui/icons-material/CloseRounded';

import ThemedIconButton from 'components/ThemedIconButton';
import ThemedTooltip from 'components/ThemedTooltip';
import Loader from 'components/Loader';

import './PlayerInfoModal.scss';

const PlayerInfoModal = ({ open, handleClose, playerId }) => {
   const [playerInfo, setPlayerInfo] = useState(null);

   const playerGid = useMemo(() => {
      return convertIdToGid('PlayerNode', playerId);
   }, [playerId]);

   const { data, loading } = useQuery(GET_PLAYER, {
      variables: {
         playerGid,
      },
   });

   useMemo(() => {
      setPlayerInfo(data?.player);
   }, [data]);

   return (
      <Modal open={open} onClose={handleClose} keepMounted>
         <div className="playerInfoModal">
            <div className="playerInfoModal__header">
               <h1>Informacje o zawodniku</h1>

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
               <div className="playerInfoModal__content">
                  <div className="contnet__playerData">
                     <p className="playerData__text">
                        Imię i nazwisko:{' '}
                        <span>
                           {playerInfo?.firstName} {playerInfo?.lastName}
                        </span>
                     </p>
                     <p className="playerData__text">
                        Data urodzenia: <span>{playerInfo?.dateOfBirth}</span>
                     </p>
                     <p className="playerData__text">
                        Wzrost: <span>{playerInfo?.height} m</span>
                     </p>
                     <p className="playerData__text">
                        Waga: <span>{playerInfo?.weight} kg</span>
                     </p>
                     <p className="playerData__text">
                        Numer zawodnika: <span>{playerInfo?.playerNumber}</span>
                     </p>
                     <p className="playerData__text">
                        Pozycja zawodnika: <span>{playerInfo?.position?.name}</span>
                     </p>
                  </div>

                  <div className="content__playerStatistics">
                     <h2 className="playerStatistics__title">Statystyki zawodnika</h2>
                     <p className="playerStatistics__text">
                        Strzelone bramki: <span>{playerInfo?.goals}</span>
                     </p>
                     <p className="playerStatistics__text">
                        Asysty: <span>{playerInfo?.assists}</span>
                     </p>
                     <p className="playerStatistics__text">
                        Obronione strzały: <span>{playerInfo?.saves}</span>
                     </p>
                     <p className="playerStatistics__text">
                        Żółte kartki: <span>{playerInfo?.yellowCards}</span>
                     </p>
                     <p className="playerStatistics__text">
                        Czerwone kartki: <span>{playerInfo?.redCards}</span>
                     </p>
                  </div>
               </div>
            )}
         </div>
      </Modal>
   );
};

PlayerInfoModal.propTypes = {
   open: bool,
   handleClose: func,
   playerId: string,
};

export default memo(PlayerInfoModal);
