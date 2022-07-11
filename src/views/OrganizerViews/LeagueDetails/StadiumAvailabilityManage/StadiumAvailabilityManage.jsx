import React, { useState, useMemo, lazy, Suspense } from 'react';
import { useParams, useHistory } from 'react-router-dom';
import { useQuery } from '@apollo/client';

import GET_STADIUM from 'api/queries/GET_STADIUM';

import useToggleVisibility from 'hooks/useToggleVisibility';

import { goBack } from 'utils/routerFunctions';

import useBreadcrumbs from 'components/Breadcrumbs/useBreadcrumbs';
import Loader from 'components/Loader';
import ThemedButton from 'components/ThemedButton';

import StadiumAvailabilitiesTable from './StadiumAvailabilitiesTable';
const FormAddStadiumAvailability = lazy(() => import('./FormAddStadiumAvailability'));

import './StadiumAvailabilityManage.scss';

const StadiumAvailabilityManage = () => {
   const history = useHistory();
   const [stadiumDetails, setStadiumDetails] = useState(null);
   const [isFormVisible, handleFormVisibility] = useToggleVisibility(false);
   const { stadiumGid } = useParams();

   useBreadcrumbs(
      {
         replace: {
            [stadiumGid]: stadiumDetails?.name,
         },
      },
      [stadiumDetails]
   );

   const { data, loading } = useQuery(GET_STADIUM, {
      variables: {
         stadiumGid,
      },
   });

   useMemo(() => {
      setStadiumDetails(data?.stadium);
   }, [data]);

   if (loading) {
      return <Loader />;
   }

   return (
      <div className="stadiumAvailabilityManage">
         <div className="stadiumAvailabilityManage__header">
            <div>
               <h1>
                  Lista możliwymi terminów rozgrywek dla stadionu <br /> "{stadiumDetails?.name}"
               </h1>
            </div>

            <div className="header__buttons">
               <ThemedButton
                  variant="outlined"
                  color="primary"
                  onClick={goBack(history)}
                  className="header_button"
               >
                  Powrót do zarządzania ligą
               </ThemedButton>

               <ThemedButton
                  variant="outlined"
                  color="primary"
                  onClick={handleFormVisibility}
                  className="header_button"
               >
                  Dodaj dostępność
               </ThemedButton>
            </div>
         </div>

         <div className="stadiumAvailabilityManage__form">
            <Suspense
               fallback={
                  <div className="form__loading">
                     <Loader />
                  </div>
               }
            >
               {isFormVisible && <FormAddStadiumAvailability stadiumGid={stadiumGid} />}
            </Suspense>
         </div>

         <div className="stadiumAvailabilityManage__table">
            <StadiumAvailabilitiesTable stadiumGid={stadiumGid} />
         </div>
      </div>
   );
};

export default StadiumAvailabilityManage;
