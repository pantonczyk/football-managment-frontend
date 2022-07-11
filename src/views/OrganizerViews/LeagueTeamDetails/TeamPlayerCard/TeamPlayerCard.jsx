import React, { memo, useState, useMemo } from 'react';
import { string, number } from 'prop-types';

import useComponentVisibility from 'hooks/useComponentVisibility';

import parseImage from 'parsers/paresImage';

import ThemedButton from 'components/ThemedButton';

import PlayerInfoModal from './PlayerInfoModal';

import DefaultPlayerImage from 'images/defaultPlayer.png';

import './TeamPlayerCard.scss';

const TeamPlayerCard = ({ playerId, firstName, lastName, playerNumber, photo, playerPosition }) => {
   const [playerPhoto, setPlayerPhoto] = useState(null);
   const [isOpenPlayerInfoModal, handleOpenPlayerInfoModal, handleClosePlayerInfoModal] =
      useComponentVisibility(false);

   useMemo(() => {
      const parsedPhoto = parseImage(photo, DefaultPlayerImage);
      setPlayerPhoto(parsedPhoto);
   }, [photo]);

   return (
      <>
         <div className="teamPalyerCard">
            <img src={playerPhoto} alt="Zdjęcie zawodnika" className="teamPalyerCard__image" />
            <div className="teamPalyerCard__content">
               <h1 className="teamPalyerCard__header">
                  {firstName} {lastName}
               </h1>
               <p className="teamPalyerCard__info">
                  Numer zadownika: <span>{playerNumber}</span>
               </p>
               <p className="teamPalyerCard__info">
                  Pozycja zadownika: <span>{playerPosition}</span>
               </p>
               <div className="teamPalyerCard__button">
                  <ThemedButton
                     variant="outlined"
                     color="primary"
                     onClick={handleOpenPlayerInfoModal}
                  >
                     Szczegółowe informacje
                  </ThemedButton>
               </div>
            </div>
         </div>

         <PlayerInfoModal
            open={isOpenPlayerInfoModal}
            handleClose={handleClosePlayerInfoModal}
            playerId={playerId}
         />
      </>
   );
};

TeamPlayerCard.propTypes = {
   playerId: string,
   firstName: string,
   lastName: string,
   playerNumber: number,
   photo: string,
   playerPosition: string,
};

export default memo(TeamPlayerCard);
