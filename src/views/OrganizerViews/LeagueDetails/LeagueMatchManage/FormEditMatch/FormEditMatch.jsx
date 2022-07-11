import React, { memo, useState } from 'react';
import { Formik } from 'formik';
import { useMutation } from '@apollo/client';
import * as Yup from 'yup';
import { string } from 'prop-types';

import UPDATE_MATCH from 'api/mutations/UPDATE_MATCH';

import ThemedTextField from 'components/ThemedTextField';
import ThemedDateTimePicker from 'components/ThemedDateTimePicker';
import ThemedButton from 'components/ThemedButton';

import './FormEditMatch.scss';

const FormEditMatch = ({ matchGid, date, judge, stadium }) => {
   const [errorMessage, setErrorMessage] = useState('');
   const [updateMatchMutation, { loading }] = useMutation(UPDATE_MATCH);

   const validationSchema = Yup.object().shape({
      date: Yup.date().required('To pole jest wymagane!'),
      judge: Yup.string().required('To pole jest wymagane!'),
      stadium: Yup.string().required('To pole jest wymagane!'),
   });

   const updateMatch = ({ date, judge, stadium }) => {
      setErrorMessage('');
      updateMatchMutation({
         variables: {
            matchGid,
            date,
            judge,
            stadium,
         },
      }).catch((error) => setErrorMessage(error.message));
   };

   const handleSubmit = (values) => {
      updateMatch(values);
   };

   return (
      <div className="updateMatch">
         <div className="updateMatch__header">
            <h1>Edytuj dane meczu</h1>
         </div>

         <Formik
            initialValues={{ date: date, judge: judge, stadium: stadium }}
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
               <form onSubmit={handleSubmit} className="updateMatch__form">
                  <ThemedDateTimePicker
                     variant="outlined"
                     size="small"
                     type="date"
                     label="Data rozpoczęcia meczu"
                     name="date"
                     className="form__input"
                     onChange={(value) => setFieldValue('date', value)}
                     onBlur={handleBlur}
                     value={values.date}
                     error={touched.date && errors.date ? true : false}
                     helperText={touched.date && errors.date}
                     disabled={loading}
                  />

                  <ThemedTextField
                     variant="outlined"
                     size="small"
                     label="Sędzia"
                     name="judge"
                     className="form__input"
                     onChange={handleChange}
                     onBlur={handleBlur}
                     value={values.judge}
                     error={touched.judge && errors.judge ? true : false}
                     helperText={touched.judge && errors.judge}
                     disabled={loading}
                  />

                  <ThemedTextField
                     variant="outlined"
                     size="small"
                     label="Stadion"
                     name="stadium"
                     className="form__input"
                     onChange={handleChange}
                     onBlur={handleBlur}
                     value={values.stadium}
                     error={touched.stadium && errors.stadium ? true : false}
                     helperText={touched.stadium && errors.stadium}
                     disabled={loading}
                  />

                  <div className="form__button">
                     <ThemedButton type="submit" color="primary" disabled={loading}>
                        Zaktualizuj
                     </ThemedButton>
                  </div>
                  <span className="form__errors">{errorMessage}</span>
               </form>
            )}
         </Formik>
      </div>
   );
};

FormEditMatch.propTypes = {
   matchGid: string,
   date: string,
   judge: string,
   stadium: string,
};

export default memo(FormEditMatch);
