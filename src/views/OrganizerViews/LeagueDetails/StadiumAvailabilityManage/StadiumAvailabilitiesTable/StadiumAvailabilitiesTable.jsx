import React, { memo, useState, useMemo } from 'react';
import { useQuery, useMutation } from '@apollo/client';
import { string } from 'prop-types';

import GET_STADIUM_AVAILABILITY_BY_STADIUM from 'api/queries/GET_STADIUM_AVAILABILITY_BY_STADIUM';
import REMOVE_STADIUM_AVAILABILITY from 'api/mutations/REMOVE_STADIUM_AVAILABILITY';

import convertIdToGid from 'utils/convertIdToGid';
import showDayOfTheWeek from 'utils/showDayOfTheWeek';
import trimSecondsOfTheDisplayedTime from 'utils/trimSecondsOfTheDisplayedTime';

import Loader from 'components/Loader';
import ThemedButton from 'components/ThemedButton';
import ThemedIconButton from 'components/ThemedIconButton';
import ThemedTooltip from 'components/ThemedTooltip';

import DeleteRoundedIcon from '@mui/icons-material/DeleteRounded';

import './StadiumAvailabilitiesTable.scss';

const StadiumAvailabilitiesTable = ({ stadiumGid }) => {
   const [stadiumAvailabilitiesList, setStadiumAvailabilitiesList] = useState([]);

   const { data, loading } = useQuery(GET_STADIUM_AVAILABILITY_BY_STADIUM, {
      variables: {
         stadiumGid,
      },
   });

   useMemo(() => {
      setStadiumAvailabilitiesList(data?.stadiumAvailabilitiesByStadium);
   }, [data]);

   const [removeStadiumAvailabilityMutation] = useMutation(REMOVE_STADIUM_AVAILABILITY);

   const removeStadiumAvailability = (stadiumAvailabilityId) => () => {
      const stadiumAvailabilityGid = convertIdToGid(
         'StadiumAvailabilityNode',
         stadiumAvailabilityId
      );

      removeStadiumAvailabilityMutation({
         variables: {
            stadiumAvailabilityGid,
         },
         update(cache) {
            cache.modify({
               fields: {
                  stadiumAvailabilitiesByStadium(existingStadiumAvailabilitiesRefs, { readField }) {
                     return existingStadiumAvailabilitiesRefs.filter(
                        (stadiumAvailabilitiesRef) =>
                           stadiumAvailabilityId !== readField('id', stadiumAvailabilitiesRef)
                     );
                  },
                  stadiumAvailabilitiesByLeague(existingStadiumAvailabilitiesRefs, { readField }) {
                     return existingStadiumAvailabilitiesRefs.filter(
                        (stadiumAvailabilitiesRef) =>
                           stadiumAvailabilityId !== readField('id', stadiumAvailabilitiesRef)
                     );
                  },
               },
            });
         },
      });
   };

   return (
      <div className="stadiumAvailabilitiesTable">
         <ul className="stadiumAvailabilitiesTable__table">
            <li className="table__header">
               <div className="row__col row__col-35">Dzień tygodnia</div>
               <div className="row__col row__col-30">Godzina rozpoczęcia</div>
               <div className="row__col row__col-30">Godzina zakończenia</div>
               <div className="row__col row__col-5"></div>
            </li>

            {loading ? (
               <Loader />
            ) : stadiumAvailabilitiesList?.length ? (
               stadiumAvailabilitiesList?.map(({ id, day, startHour, endHour }) => (
                  <li key={id} className="table__row">
                     <div className="row__col row__col-35" data-label="Dzień tygodnia">
                        {showDayOfTheWeek(day)}
                     </div>

                     <div className="row__col row__col-30" data-label="Godzina rozpoczęcia">
                        {trimSecondsOfTheDisplayedTime(startHour)}
                     </div>

                     <div className="row__col row__col-30" data-label="Godzina zakończenia">
                        {trimSecondsOfTheDisplayedTime(endHour)}
                     </div>

                     <div className="row__col row__col-5 row__coll-options">
                        <ThemedIconButton
                           size="small"
                           color="error"
                           onClick={removeStadiumAvailability(id)}
                        >
                           <ThemedTooltip title="Usuń termin">
                              <DeleteRoundedIcon style={{ color: '#ff2b59' }} />
                           </ThemedTooltip>
                        </ThemedIconButton>
                     </div>

                     <div className="row__col--mobileOptions">
                        <ThemedButton
                           variant="outlined"
                           color="secondary"
                           size="small"
                           className="mobileOption"
                           onClick={removeStadiumAvailability(id)}
                        >
                           Usuń termin
                        </ThemedButton>
                     </div>
                  </li>
               ))
            ) : (
               <li className="table__emptyState">Brak terminów rozgrywek do wyświetlenia</li>
            )}
         </ul>
      </div>
   );
};

StadiumAvailabilitiesTable.propTypes = {
   stadiumGid: string,
};

export default memo(StadiumAvailabilitiesTable);
