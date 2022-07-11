import React, { memo, useState, useMemo } from 'react';
import { useHistory } from 'react-router-dom';
import { useParams } from 'react-router-dom';
import { string, number } from 'prop-types';

import parseImage from 'parsers/paresImage';
import { redirectTo } from 'utils/routerFunctions';
import convertIdToGid from 'utils/convertIdToGid';

import ThemedButton from 'components/ThemedButton';

import DefaultPlayerImage from 'images/defaultPlayer.png';

import './PlayerCard.scss';

const PlayerCard = ({ playerId, firstName, lastName, playerNumber, photo, playerPosition }) => {
   const history = useHistory();
   const { teamGid } = useParams();
   const [playerPhoto, setPlayerPhoto] = useState(null);
   const playerGid = convertIdToGid('PlayerNode', playerId);

   useMemo(() => {
      const parsedPhoto = parseImage(photo, DefaultPlayerImage);
      setPlayerPhoto(parsedPhoto);
   }, [photo]);

   return (
      <div className="playerCard">
         <img src={playerPhoto} alt="Zdjęcie zawodnika" className="playerCard__image" />
         <div className="playerCard__content">
            <h1 className="playerCard__header">
               {firstName} {lastName}
            </h1>
            <p className="playerCard__info">
               Numer zadownika: <span>{playerNumber}</span>
            </p>
            <p className="playerCard__info">
               Pozycja zadownika: <span>{playerPosition}</span>
            </p>
            <div className="playerCard__button">
               <ThemedButton
                  variant="outlined"
                  color="primary"
                  onClick={redirectTo(
                     history,
                     `/team-representative/teams/${teamGid}/team-composition/${playerGid}`
                  )}
               >
                  Przejdź do szczegółów
               </ThemedButton>
            </div>
         </div>
      </div>
   );
};

PlayerCard.propTypes = {
   playerId: string,
   firstName: string,
   lastName: string,
   playerNumber: number,
   photo: string,
   playerPosition: string,
};

export default memo(PlayerCard);
