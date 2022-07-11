import React, { useState, useMemo, lazy, Suspense } from 'react';
import { useParams, useHistory } from 'react-router-dom';
import { useMutation, useQuery } from '@apollo/client';

import GET_PLAYER from 'api/queries/GET_PLAYER';
import REMOVE_PLAYER from 'api/mutations/REMOVE_PLAYER';
import REMOVE_PLAYER_PHOTO from 'api/mutations/REMOVE_PLAYER_PHOTO';

import useToggleVisibility from 'hooks/useToggleVisibility';

import { goBack } from 'utils/routerFunctions';
import parseImage from 'parsers/paresImage';

import useBreadcrumbs from 'components/Breadcrumbs/useBreadcrumbs';
import Loader from 'components/Loader';
import ThemedButton from 'components/ThemedButton';

import DefaultPlayerImage from 'images/defaultPlayer.png';

const FormEditPlayer = lazy(() => import('./FormEditPlayer'));

import './PlayerDetails.scss';

const PlayerDetails = () => {
   const [playerData, setPlayerData] = useState(null);
   const [playerPhoto, setPlayerPhoto] = useState(null);
   const [isFormVisible, handleFormVisibility] = useToggleVisibility(false);
   const { playerGid } = useParams();
   const history = useHistory();
   const [removePlayerMutation] = useMutation(REMOVE_PLAYER);
   const [removePlayerPhotoMutation] = useMutation(REMOVE_PLAYER_PHOTO);

   useBreadcrumbs(
      {
         replace: {
            [playerGid]: playerData?.lastName,
         },
      },
      [playerData]
   );

   const { data } = useQuery(GET_PLAYER, {
      variables: {
         playerGid,
      },
   });

   useMemo(() => {
      setPlayerData(data?.player);
   }, [data]);

   const {
      firstName = '',
      lastName = '',
      height = '',
      weight = '',
      dateOfBirth = '',
      playerNumber = '',
      goals = '',
      assists = '',
      saves = '',
      redCards = '',
      yellowCards = '',
      photo = '',
      position = '',
   } = playerData || {};

   useMemo(() => {
      const parsedPhoto = parseImage(photo, DefaultPlayerImage);
      setPlayerPhoto(parsedPhoto);
   }, [photo]);

   const redirectToTeam = (data) => {
      if (data.removePlayer.removed) history.goBack();
   };

   const removePlayer = (playerGid) => () => {
      removePlayerMutation({
         variables: {
            playerGid,
         },
         update(cache) {
            cache.modify({
               fields: {
                  playersByTeam(existingPlayerRefs, { readField }) {
                     return existingPlayerRefs.filter(
                        (playerRef) => playerData?.id !== readField('id', playerRef)
                     );
                  },
               },
            });
         },
      }).then(({ data }) => redirectToTeam(data));
   };

   const removePlayerPhoto = (playerGid) => () => {
      removePlayerPhotoMutation({
         variables: {
            playerGid,
         },
      });
   };

   return (
      <div className="playerDetails">
         <div className="playerDetails__header">
            <ThemedButton variant="outlined" color="primary" onClick={goBack(history)} size="small">
               Powrót do listy zawodników
            </ThemedButton>

            <div className="header__options">
               <ThemedButton
                  variant="outlined"
                  color="primary"
                  onClick={handleFormVisibility}
                  className="options__btn"
               >
                  Edytuj dane zawodnika
               </ThemedButton>

               <ThemedButton
                  variant="outlined"
                  color="secondary"
                  onClick={removePlayer(playerGid)}
                  className="options__btn"
               >
                  Usuń zawodnika
               </ThemedButton>
            </div>
         </div>

         <div className="playerDetails__title">
            <h1>Karta zawodnika</h1>
         </div>

         <div className="playerDetails__playerInfo">
            <div className="playerInfo__data">
               <div className="data__personalData">
                  <h2>Dane zawodnika</h2>
                  <p>
                     Imię i nazwisko:{' '}
                     <span>
                        {firstName} {lastName}
                     </span>
                  </p>
                  <p>
                     Data urodzenia: <span>{dateOfBirth}</span>
                  </p>
                  <p>
                     Wzrost: <span>{height} m</span>
                  </p>
                  <p>
                     Waga: <span>{weight} kg</span>
                  </p>
                  <p>
                     Numer zawodnika: <span>{playerNumber}</span>
                  </p>
                  <p>
                     Pozycja zawodnika: <span>{position?.name}</span>
                  </p>
               </div>

               <div className="data__statistics">
                  <h2>Statystyki w lidze</h2>
                  <p>
                     Strzelone bramki: <span>{goals}</span>
                  </p>
                  <p>
                     Asysty: <span>{assists}</span>
                  </p>
                  <p>
                     Obronione strzały: <span>{saves}</span>
                  </p>
                  <p>
                     Żółte kartki: <span>{yellowCards}</span>
                  </p>
                  <p>
                     Czerwone kartki: <span>{redCards}</span>
                  </p>
               </div>
            </div>

            <div className="playerInfo__image">
               <img src={playerPhoto} alt="Zdjęcie zawodnika" />
               <ThemedButton
                  variant="contained"
                  color="secondary"
                  onClick={removePlayerPhoto(playerGid)}
                  size="small"
                  className="image__deleteBtn"
               >
                  Usuń zdjęcie
               </ThemedButton>
            </div>
         </div>

         <div className="playerDetails__form">
            <Suspense
               fallback={
                  <div className="form__loading">
                     <Loader />
                  </div>
               }
            >
               {isFormVisible && <FormEditPlayer playerGid={playerGid} playerData={playerData} />}
            </Suspense>
         </div>
      </div>
   );
};

export default PlayerDetails;
