import React, { memo, useState } from 'react';
import { Formik } from 'formik';
import { useMutation } from '@apollo/client';
import * as Yup from 'yup';
import { string } from 'prop-types';

import CREATE_STADIUM from 'api/mutations/CREATE_STADIUM';

import ThemedTextField from 'components/ThemedTextField';
import ThemedButton from 'components/ThemedButton';

import './FormAddStadium.scss';

const FormAddStadium = ({ leagueGid }) => {
   const [errorMessage, setErrorMessage] = useState('');
   const [createStadiumMutation, { loading }] = useMutation(CREATE_STADIUM);

   const validationSchema = Yup.object().shape({
      name: Yup.string().required('To pole jest wymagane!'),
      address: Yup.string().required('To pole jest wymagane!'),
   });

   const resetFieldForm = (resetForm) => {
      resetForm({
         values: {
            name: '',
            address: '',
         },
      });
   };

   const createStadium = ({ name, address }, resetForm) => {
      setErrorMessage('');

      createStadiumMutation({
         variables: {
            leagueGid,
            name,
            address,
         },
         refetchQueries: ['GET_STADIUM_BY_LEAGUE'],
      })
         .then(resetFieldForm(resetForm))
         .catch((error) => setErrorMessage(error.message));
   };

   const handleSubmit = (values, { resetForm }) => {
      createStadium(values, resetForm);
   };

   return (
      <div className="createStadium">
         <div className="createStadium__header">
            <h1>Dodaj nowy stadion</h1>
         </div>

         <Formik
            initialValues={{
               name: '',
               address: '',
            }}
            validationSchema={validationSchema}
            onSubmit={handleSubmit}
         >
            {({ values, errors, touched, handleChange, handleBlur, handleSubmit }) => (
               <form onSubmit={handleSubmit} className="createStadium__form">
                  <ThemedTextField
                     variant="outlined"
                     size="small"
                     label="Nazwa stadionu"
                     name="name"
                     className="form__input"
                     onChange={handleChange}
                     onBlur={handleBlur}
                     value={values.name}
                     error={touched.name && errors.name ? true : false}
                     helperText={touched.name && errors.name}
                     disabled={loading}
                  />

                  <ThemedTextField
                     variant="outlined"
                     size="small"
                     label="Adres"
                     name="address"
                     className="form__input"
                     onChange={handleChange}
                     onBlur={handleBlur}
                     value={values.address}
                     error={touched.address && errors.address ? true : false}
                     helperText={touched.address && errors.address}
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

FormAddStadium.propTypes = {
   leagueGid: string,
};

export default memo(FormAddStadium);
