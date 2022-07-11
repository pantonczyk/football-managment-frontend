import React, { memo } from 'react';
import { Formik } from 'formik';
import { object, func, bool, string } from 'prop-types';

import ThemedTextField from 'components/ThemedTextField';
import ThemedButton from 'components/ThemedButton';

import './FormEditUserProfileContent.scss';

const FormEditUserProfileContent = ({
   initialValues,
   validationSchema,
   handleSubmit,
   loading,
   errorMessage,
}) => {
   return (
      <Formik
         initialValues={initialValues}
         validationSchema={validationSchema}
         onSubmit={handleSubmit}
      >
         {({ values, errors, touched, handleChange, handleBlur, handleSubmit }) => (
            <form onSubmit={handleSubmit} className="FormEditUserProfileContent">
               <ThemedTextField
                  variant="outlined"
                  size="small"
                  label="Nazwa użytkownika"
                  name="username"
                  className="FormEditUserProfileContent__input"
                  onChange={handleChange}
                  onBlur={handleBlur}
                  value={values.username}
                  error={touched.username && errors.username ? true : false}
                  helperText={touched.username && errors.username}
                  disabled={loading}
               />

               <ThemedTextField
                  variant="outlined"
                  size="small"
                  label="Imię"
                  name="firstName"
                  className="FormEditUserProfileContent__input"
                  onChange={handleChange}
                  onBlur={handleBlur}
                  value={values.firstName}
                  error={touched.firstName && errors.firstName ? true : false}
                  helperText={touched.firstName && errors.firstName}
                  disabled={loading}
               />

               <ThemedTextField
                  variant="outlined"
                  size="small"
                  label="Nazwisko"
                  name="lastName"
                  className="FormEditUserProfileContent__input"
                  onChange={handleChange}
                  onBlur={handleBlur}
                  value={values.lastName}
                  error={touched.lastName && errors.lastName ? true : false}
                  helperText={touched.lastName && errors.lastName}
                  disabled={loading}
               />

               <ThemedTextField
                  variant="outlined"
                  size="small"
                  type="email"
                  label="E-mail"
                  name="email"
                  className="FormEditUserProfileContent__input"
                  onChange={handleChange}
                  onBlur={handleBlur}
                  value={values.email}
                  error={touched.email && errors.email ? true : false}
                  helperText={touched.email && errors.email}
                  disabled={loading}
               />

               <div className="FormEditUserProfileContent__button">
                  <ThemedButton type="submit" color="primary" disabled={loading}>
                     Zaktualizuj
                  </ThemedButton>
               </div>
               <span className="FormEditUserProfileContent__errors">{errorMessage}</span>
            </form>
         )}
      </Formik>
   );
};

FormEditUserProfileContent.propTypes = {
   initialValues: object,
   validationSchema: object,
   handleSubmit: func,
   loading: bool,
   errorMessage: string,
};

export default memo(FormEditUserProfileContent);
