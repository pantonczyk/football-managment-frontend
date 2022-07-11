import React, { memo, lazy, Suspense } from 'react';
import { number, string } from 'prop-types';

import useToggleVisibility from 'hooks/useToggleVisibility';

import ThemedButton from 'components/ThemedButton';
import Loader from 'components/Loader';

import StadiumTable from './StadiumTable';
import AllAvailabilitiesTable from './AllAvailabilitiesTable';
const FormAddStadium = lazy(() => import('./FormAddStadium'));

import './LeagueManageTab.scss';

const LeagueManageTab = ({ leagueGid, leagueSize }) => {
   const [isFormAddStadiumVisible, handleFormAddStadiumVisibility] = useToggleVisibility(false);

   return (
      <div className="leagueManageTab">
         <div className="leagueManageTab__header">
            <h1>Zarządzanie ligą</h1>
            <ThemedButton
               variant="outlined"
               color="primary"
               onClick={handleFormAddStadiumVisibility}
            >
               Dodaj stadion
            </ThemedButton>
         </div>

         <div className="leagueManageTab__form">
            <Suspense
               fallback={
                  <div className="form__loading">
                     <Loader />
                  </div>
               }
            >
               {isFormAddStadiumVisible && <FormAddStadium leagueGid={leagueGid} />}
            </Suspense>
         </div>

         <div className="leagueManageTab__stadiumTable">
            <StadiumTable leagueGid={leagueGid} />
         </div>
         <div className="leagueManageTab__stadiumAvailabilitiesTable">
            <AllAvailabilitiesTable leagueGid={leagueGid} leagueSize={leagueSize} />
         </div>
      </div>
   );
};

LeagueManageTab.propTypes = {
   leagueGid: string,
   leagueSize: number,
};

export default memo(LeagueManageTab);
