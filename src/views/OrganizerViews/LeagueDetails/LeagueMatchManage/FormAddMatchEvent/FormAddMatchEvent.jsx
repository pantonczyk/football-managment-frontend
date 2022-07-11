import React, { memo, useState, useMemo } from 'react';
import { Formik } from 'formik';
import { useMutation, useQuery } from '@apollo/client';
import * as Yup from 'yup';
import { object, string } from 'prop-types';

import GET_EVENT_TYPES from 'api/queries/GET_EVENT_TYPES';
import ADD_MATCH_EVENT from 'api/mutations/ADD_MATCH_EVENT';

import convertIdToGid from 'utils/convertIdToGid';

import ThemedTextField from 'components/ThemedTextField';
import ThemedSelect from 'components/ThemedSelect';
import ThemedAutocomplete from 'components/ThemedAutocomplete';
import ThemedButton from 'components/ThemedButton';

import './FormAddMatchEvent.scss';

const FormAddMatchEvent = ({ matchGid, homeTeam, awayTeam }) => {
   const [errorMessage, setErrorMessage] = useState('');
   const [eventTypesList, setEventTypesList] = useState([]);
   const [addMatchEventMutation, { loading }] = useMutation(ADD_MATCH_EVENT);

   useQuery(GET_EVENT_TYPES, {
      onCompleted: (data) => {
         setEventTypesList(data?.eventTypes);
      },
   });

   const teamsOfMatch = useMemo(() => {
      return [
         {
            id: homeTeam?.id,
            name: homeTeam?.shortName,
         },
         {
            id: awayTeam?.id,
            name: awayTeam?.shortName,
         },
      ];
   }, [homeTeam, awayTeam]);

   const getTeamPlayerSet = (teamId) => {
      switch (teamId) {
         case homeTeam?.id:
            return homeTeam?.playerSet;
         case awayTeam?.id:
            return awayTeam?.playerSet;
         default:
            return [];
      }
   };

   const handleChangeTeamValue = (value, setFieldValue, setFieldTouched) => {
      setFieldValue('teamId', value);
      setFieldValue('player', null);
      setFieldTouched('player', false, false);
   };

   const validationSchema = Yup.object().shape({
      minute: Yup.number()
         .required('To pole jest wymagane!')
         .integer('Wartość musi być liczbą całkowitą!')
         .positive('Wartość nie może być liczbą ujemną!')
         .min(1, 'Minimalna możliwa wartość to 1!'),
      teamId: Yup.number().required('To pole jest wymagane!'),
      player: Yup.object().required('To pole jest wymagane!'),
      eventTypeId: Yup.number().required('To pole jest wymagane!'),
   });

   const resetFormField = (resetForm) => {
      resetForm({
         values: {
            minute: '',
            teamId: '',
            player: null,
            eventTypeId: '',
         },
      });
   };

   const addMatchEvent = ({ minute, teamId, player, eventTypeId }, resetForm) => {
      setErrorMessage('');

      const eventTypeGid = convertIdToGid('EventTypeNode', eventTypeId);
      const teamGid = convertIdToGid('TeamNode', teamId);
      const playerGid = convertIdToGid('PlayerNode', player?.id);

      addMatchEventMutation({
         variables: {
            matchGid,
            minute,
            teamGid,
            playerGid,
            eventTypeGid,
         },
      })
         .then(resetFormField(resetForm))
         .catch((error) => setErrorMessage(error.message));
   };

   const handleSubmit = (values, { resetForm }) => {
      addMatchEvent(values, resetForm);
   };

   return (
      <div className="formAddMatchEvent">
         <div className="formAddMatchEvent__header">
            <h1>Dodaj nowe zdarzenie</h1>
         </div>

         <Formik
            initialValues={{
               minute: '',
               teamId: '',
               player: null,
               eventTypeId: '',
            }}
            validationSchema={validationSchema}
            onSubmit={handleSubmit}
         >
            {({
               values,
               errors,
               touched,
               handleChange,
               handleBlur,
               handleSubmit,
               setFieldValue,
               setFieldTouched,
            }) => (
               <form onSubmit={handleSubmit} className="formAddMatchEvent__form">
                  <ThemedTextField
                     variant="outlined"
                     size="small"
                     type="number"
                     InputProps={{ inputProps: { min: 1 } }}
                     label="Minuta meczu"
                     name="minute"
                     className="form__input"
                     onChange={handleChange}
                     onBlur={handleBlur}
                     value={values.minute}
                     error={touched.minute && errors.minute ? true : false}
                     helperText={touched.minute && errors.minute}
                     disabled={loading}
                  />

                  <ThemedSelect
                     variant="outlined"
                     size="small"
                     wrapperClass="form__input"
                     label="Zespół"
                     name="teamId"
                     menuItemsList={teamsOfMatch}
                     propsToMapValue="id"
                     propsToMapName="name"
                     onChange={(e) =>
                        handleChangeTeamValue(e.target.value, setFieldValue, setFieldTouched)
                     }
                     onBlur={handleBlur}
                     value={values.teamId}
                     error={touched.teamId && errors.teamId ? true : false}
                     helperText={touched.teamId && errors.teamId}
                     disabled={loading}
                  />

                  <ThemedAutocomplete
                     variant="outlined"
                     size="small"
                     wrapperClass="form__input"
                     label="Zawodnik"
                     name="player"
                     options={getTeamPlayerSet(values.teamId)}
                     placeholder="Wybierz zawodnika"
                     getOptionLabel={(option) => option.extendedName}
                     onChange={(e, value) => setFieldValue('player', value)}
                     onBlur={handleBlur}
                     value={values.player}
                     error={touched.player && errors.player ? true : false}
                     helperText={touched.player && errors.player}
                     disabled={loading || values.teamId ? false : true}
                  />

                  <ThemedSelect
                     variant="outlined"
                     size="small"
                     wrapperClass="form__input"
                     label="Rodzaj zdarzenia"
                     name="eventTypeId"
                     menuItemsList={eventTypesList}
                     propsToMapValue="id"
                     propsToMapName="name"
                     onChange={handleChange}
                     onBlur={handleBlur}
                     value={values.eventTypeId}
                     error={touched.eventTypeId && errors.eventTypeId ? true : false}
                     helperText={touched.eventTypeId && errors.eventTypeId}
                     disabled={loading}
                  />

                  <div className="form__button">
                     <ThemedButton type="submit" color="primary" disabled={loading}>
                        Dodaj
                     </ThemedButton>
                  </div>
                  <span className="form__errors">{errorMessage}</span>
               </form>
            )}
         </Formik>
      </div>
   );
};

FormAddMatchEvent.propTypes = {
   matchGid: string,
   homeTeam: object,
   awayTeam: object,
};

export default memo(FormAddMatchEvent);
