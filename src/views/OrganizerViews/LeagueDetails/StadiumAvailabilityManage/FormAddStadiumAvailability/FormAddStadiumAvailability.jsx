import React, { memo, useState } from 'react';
import { Formik } from 'formik';
import { gql, useMutation } from '@apollo/client';
import { format, isAfter } from 'date-fns';
import * as Yup from 'yup';
import { string } from 'prop-types';

import CREATE_STADIUM_AVAILABILITY from 'api/mutations/CREATE_STADIUM_AVAILABILITY';
import STADIUM_AVAILABILITY from 'api/fragments/STADIUM_AVAILABILITY';

import ThemedSelect from 'components/ThemedSelect';
import ThemedTimePicker from 'components/ThemedTimePicker';
import ThemedButton from 'components/ThemedButton';

import { dayOfTheWeek } from './dayOfTheWeek';

import './FormAddStadiumAvailability.scss';

const FormAddStadiumAvailability = ({ stadiumGid }) => {
   const [errorMessage, setErrorMessage] = useState('');
   const [createStadiumAvailabilityMutation, { loading }] = useMutation(
      CREATE_STADIUM_AVAILABILITY
   );

   const validationSchema = Yup.object().shape({
      day: Yup.number().required('To pole jest wymagane!'),
      startHour: Yup.date()
         .typeError('Nieprawidłowy format')
         .nullable()
         .required('To pole jest wymagane!'),
      endHour: Yup.date()
         .typeError('Nieprawidłowy format')
         .nullable()
         .required('To pole jest wymagane!')
         .test(
            'is-some-after-start-time',
            'Godzina zakończenia powinna być później od godziny rozpoczęcia',
            function (value) {
               const { startHour } = this.parent;
               return isAfter(value, startHour);
            }
         ),
   });

   const resetFieldForm = (resetForm) => {
      resetForm({
         values: {
            day: '',
            startHour: null,
            endHour: null,
         },
      });
   };

   const createStadiumAvailability = ({ day, startHour, endHour }, resetForm) => {
      setErrorMessage('');
      const startTimeParse = format(new Date(startHour), 'HH:mm:ss');
      const endTimeParse = format(new Date(endHour), 'HH:mm:ss');

      createStadiumAvailabilityMutation({
         variables: {
            day,
            startHour: startTimeParse,
            endHour: endTimeParse,
            stadiumGid,
         },
         refetchQueries: ['GET_STADIUM_AVAILABILITY_BY_STADIUM'],
         update(cache, { data: { createStadiumAvailability } }) {
            cache.modify({
               fields: {
                  stadiumAvailabilitiesByLeague(existingsAvailabilities = []) {
                     const newAvailabilitiesRef = cache.writeFragment({
                        data: createStadiumAvailability?.stadiumAvailability,
                        fragment: STADIUM_AVAILABILITY,
                     });
                     return [...existingsAvailabilities, newAvailabilitiesRef];
                  },
               },
            });
         },
      })
         .then(resetFieldForm(resetForm))
         .catch((error) => setErrorMessage(error.message));
   };

   const handleSubmit = (values, { resetForm }) => {
      createStadiumAvailability(values, resetForm);
   };

   return (
      <div className="formAddStadiumAvailability">
         <div className="formAddStadiumAvailability__header">
            <h1>Dodaj termin rozgrywek</h1>
            <p>
               Jeden termin odpowiada jednemu spotkaniu. Godzina rozpoczęcia jednoznaczna jest z
               godziną rozpoczęcia meczu. Na podstawie terminów rozgrywek dla stadionów zostanie
               wygenerowany terminarz spotkań.
            </p>
         </div>

         <Formik
            initialValues={{
               day: '',
               startHour: null,
               endHour: null,
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
            }) => (
               <form onSubmit={handleSubmit} className="formAddStadiumAvailability__form">
                  <ThemedSelect
                     variant="outlined"
                     size="small"
                     wrapperClass="form__input"
                     label="Dzień tygodnia"
                     name="day"
                     menuItemsList={dayOfTheWeek}
                     propsToMapValue="id"
                     propsToMapName="day"
                     onChange={handleChange}
                     onBlur={handleBlur}
                     value={values.day}
                     error={touched.day && errors.day ? true : false}
                     helperText={touched.day && errors.day}
                     disabled={loading}
                  />

                  <ThemedTimePicker
                     label="Godzina rozpoczęcia"
                     name="startHour"
                     className="form__input"
                     onChange={(value) => setFieldValue('startHour', value)}
                     onBlur={handleBlur}
                     value={values.startHour}
                     error={touched.startHour && errors.startHour ? true : false}
                     helperText={touched.startHour && errors.startHour}
                     disabled={loading}
                  />

                  <ThemedTimePicker
                     label="Godzina zakończenia"
                     name="endHour"
                     className="form__input"
                     onChange={(value) => setFieldValue('endHour', value)}
                     onBlur={handleBlur}
                     value={values.endHour}
                     error={touched.endHour && errors.endHour ? true : false}
                     helperText={touched.endHour && errors.endHour}
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

FormAddStadiumAvailability.propTypes = {
   stadiumGid: string,
};

export default memo(FormAddStadiumAvailability);
