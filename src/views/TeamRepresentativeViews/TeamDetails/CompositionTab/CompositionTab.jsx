import React, { useState, useMemo, memo, lazy, Suspense } from 'react';
import { useQuery } from '@apollo/client';
import { string } from 'prop-types';

import GET_PLAYERS_BY_TEAM from 'api/queries/GET_PLAYERS_BY_TEAM';

import useToggleVisibility from 'hooks/useToggleVisibility';

import Loader from 'components/Loader';
import ThemedSearchTextField from 'components/ThemedSearchTextField';
import ThemedButton from 'components/ThemedButton';

import PlayerCard from './PlayerCard';

const FormAddPLayer = lazy(() => import('./FormAddPLayer'));

import './CompositionTab.scss';

const CompositionTab = ({ teamGid }) => {
   const [playersList, setPlayersList] = useState([]);
   const [playerSearchFilter, setPlayerSearchFilter] = useState('');
   const [isFormVisible, handleFormVisibility] = useToggleVisibility(false);

   const { data, loading } = useQuery(GET_PLAYERS_BY_TEAM, {
      variables: {
         teamGid,
         searchPhrase: playerSearchFilter,
      },
      fetchPolicy: 'cache-and-network',
   });

   useMemo(() => {
      setPlayersList(data?.playersByTeam);
   }, [data]);

   const handleSetPlayerSearchFilter = (e) => {
      setPlayerSearchFilter(e.target.value);
   };

   return (
      <div className="compositionTab">
         <div className="compositionTab__header">
            <h1>Skład zespołu</h1>
            <ThemedButton variant="outlined" color="primary" onClick={handleFormVisibility}>
               Dodaj zawodnika
            </ThemedButton>
         </div>
         <div className="compositionTab__form">
            <Suspense
               fallback={
                  <div className="form__loading">
                     <Loader />
                  </div>
               }
            >
               {isFormVisible && <FormAddPLayer teamGid={teamGid} />}
            </Suspense>
         </div>
         <div className="compositionTab__filters">
            <ThemedSearchTextField
               id="playerSearch"
               name="playerSearchFilter"
               type="search"
               placeholder="Wyszukaj gracza"
               variant="outlined"
               onChange={handleSetPlayerSearchFilter}
               className="inputFilter"
               size="small"
               value={playerSearchFilter}
            />
         </div>

         {loading ? (
            <Loader />
         ) : playersList?.length ? (
            <div className="compositionTab__cards">
               {playersList.map(({ id, firstName, lastName, playerNumber, photo, position }) => (
                  <PlayerCard
                     key={id}
                     playerId={id}
                     firstName={firstName}
                     lastName={lastName}
                     playerNumber={playerNumber}
                     photo={photo}
                     playerPosition={position?.name}
                  />
               ))}
            </div>
         ) : (
            <p className="compositionTab__emptyState">Brak zawodników do wyświetlenia</p>
         )}
      </div>
   );
};

CompositionTab.propTypes = {
   teamGid: string,
};

export default memo(CompositionTab);
