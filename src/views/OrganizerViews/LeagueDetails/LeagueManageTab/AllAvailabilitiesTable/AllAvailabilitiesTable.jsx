import React, { memo, useState, useMemo } from 'react';
import { useQuery, useMutation } from '@apollo/client';
import { useHistory } from 'react-router-dom';
import { string } from 'prop-types';

import GET_LEAGUE from 'api/queries/GET_LEAGUE';
import GET_STADIUM_AVAILABILITIES_BY_LEAGUE from 'api/queries/GET_STADIUM_AVAILABILITIES_BY_LEAGUE';
import GENERATE_LEAGUE_MATCH_SCHEDULE from 'api/mutations/GENERATE_LEAGUE_MATCH_SCHEDULE';

import showDayOfTheWeek from 'utils/showDayOfTheWeek';
import trimSecondsOfTheDisplayedTime from 'utils/trimSecondsOfTheDisplayedTime';

import ThemedButton from 'components/ThemedButton';
import Loader from 'components/Loader';

import './AllAvailabilitiesTable.scss';

const AllAvailabilitiesTable = ({ leagueGid }) => {
   const [allStadiumAvailabilitiesList, setAllStadiumAvailabilitiesList] = useState([]);
   const [generateScheduleError, setGenerateScheduleError] = useState('');
   const [league, setLeague] = useState(null);
   const [generateLeagueMatchScheduleMutation] = useMutation(GENERATE_LEAGUE_MATCH_SCHEDULE);
   const history = useHistory();

   const { data, loading } = useQuery(GET_STADIUM_AVAILABILITIES_BY_LEAGUE, {
      variables: {
         leagueGid,
      },
   });

   const { data: leagueQueryData } = useQuery(GET_LEAGUE, {
      variables: {
         leagueGid,
      },
   });

   useMemo(() => {
      setAllStadiumAvailabilitiesList(data?.stadiumAvailabilitiesByLeague);
      setLeague(leagueQueryData?.league);
   }, [data, leagueQueryData]);

   const redirectoToLeagueScheduleView = (data) => {
      if (data.generateLeagueMatchSchedule.success)
         history.push(`/league-organizer/leagues/${leagueGid}/league-schedule`);
   };

   const generateLeagueMatchSchedule = () => {
      generateLeagueMatchScheduleMutation({
         variables: {
            leagueGid,
         },
         refetchQueries: ['GET_LEAGUE'],
      })
         .then(({ data }) => redirectoToLeagueScheduleView(data))
         .catch((error) => setGenerateScheduleError(error.message));
   };

   const disableBtnGenerateSchedule = useMemo(() => {
      if (league?.matchSet.length) {
         return true;
      } else if (
         allStadiumAvailabilitiesList &&
         allStadiumAvailabilitiesList.length < league?.leagueSize / 2
      ) {
         return true;
      }

      return false;
   }, [league, allStadiumAvailabilitiesList]);

   return (
      <div className="allAvailabilitiesTable">
         <div className="allAvailabilitiesTable__header">
            <h1>Lista mo??liwych termin??w rozgrywek</h1>

            <ThemedButton
               id="btn_generateSchedule"
               variant="outlined"
               color="primary"
               disabled={disableBtnGenerateSchedule}
               onClick={generateLeagueMatchSchedule}
            >
               Generuj rozgrywki
            </ThemedButton>
         </div>
         {generateScheduleError && (
            <div className="allAvailabilitiesTable__error">
               <p>{generateScheduleError}</p>
            </div>
         )}

         <div className="allAvailabilitiesTable__info">
            <p>
               Na podstawie termin??w rozgrywek dla stadion??w zostanie wygenerowany terminarz
               spotka??. Aby by??o to mo??liwe potrzebne jest ustalenie
               <strong> {league?.leagueSize / 2} termin??w</strong>. Po wybraniu opcji
               <strong> "Generuj rozgrywki" </strong>
               edycja tej listy nie b??dzie wp??ywa??a na terminarz rozgrywek. Po wygenerowaniu
               rozgrywek istnieje mo??liwo???? r??cznej zmiany miejsca oraz terminu spotkania.
            </p>
         </div>

         <ul className="allAvailabilitiesTable__table">
            <li className="table__header">
               <div className="row__col row__col-40">Stadion</div>
               <div className="row__col row__col-20">Dzie?? tygodnia</div>
               <div className="row__col row__col-20">Godzina rozpocz??cia</div>
               <div className="row__col row__col-20">Godzina zako??czenia</div>
            </li>

            {loading ? (
               <Loader />
            ) : allStadiumAvailabilitiesList?.length ? (
               allStadiumAvailabilitiesList?.map(({ id, day, startHour, endHour, stadium }) => (
                  <li key={id} className="table__row">
                     <div className="row__col row__col-40" data-label="Stadion">
                        {stadium?.name}
                     </div>
                     <div className="row__col row__col-20" data-label="Dzie?? tygodnia">
                        {showDayOfTheWeek(day)}
                     </div>
                     <div className="row__col row__col-20" data-label="Godzina rozpocz??cia">
                        {trimSecondsOfTheDisplayedTime(startHour)}
                     </div>
                     <div className="row__col row__col-20" data-label="Godzina zako??czenia">
                        {trimSecondsOfTheDisplayedTime(endHour)}
                     </div>
                  </li>
               ))
            ) : (
               <li className="table__emptyState">Brak termin??w rozgrywek do wy??wietlenia</li>
            )}
         </ul>
      </div>
   );
};

AllAvailabilitiesTable.propTypes = {
   leagueGid: string,
};

export default memo(AllAvailabilitiesTable);
