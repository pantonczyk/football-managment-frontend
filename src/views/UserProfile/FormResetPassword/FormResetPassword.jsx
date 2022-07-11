import React, { memo, useState } from 'react';
import { Formik } from 'formik';
import { useMutation } from '@apollo/client';
import * as Yup from 'yup';

import RESET_PASSWORD from 'api/mutations/RESET_PASSWORD';

import ThemedPasswordField from 'components/ThemedPasswordField';
import ThemedButton from 'components/ThemedButton';

import './FormResetPassword.scss';

const FormResetPassword = () => {
   const [notificationVariant, setNotificationVariant] = useState('error');
   const [notificationMessage, setNotificationMessage] = useState('');

   const [resetPasswordMutation, { loading }] = useMutation(RESET_PASSWORD);

   const validationSchema = Yup.object().shape({
      password: Yup.string()
         .required('To pole jest wymagane!')
         .matches(
            /^.*(?=.{8,})((?=.*[!@#$%^&*()\-_=+{};:,<.>]){1})(?=.*\d)((?=.*[a-z]){1})((?=.*[A-Z]){1}).*$/,
            'Podane hasło nie spełnia polityki bezpieczeństwa haseł.'
         ),
      confirmedPassword: Yup.string()
         .required('To pole jest wymagane!')
         .when('password', {
            is: (password) => password?.length,
            then: Yup.string().oneOf([Yup.ref('password')], 'Hasła muszą być takie same.'),
         }),
   });

   const passwordChangeSuccess = (data) => {
      if (data.resetPassword.success) {
         setNotificationVariant('success');
         setNotificationMessage('Twoje hasło zostało zmienione.');
      }
   };
   const passwordChangeError = (error) => {
      setNotificationVariant('error');
      setNotificationMessage(error.message);
   };

   const resetPassword = ({ password, confirmedPassword }) => {
      resetPasswordMutation({
         variables: {
            password,
            confirmedPassword,
         },
      })
         .then(({ data }) => passwordChangeSuccess(data))
         .catch(passwordChangeError);
   };

   const handleSubmit = (values) => {
      resetPassword(values);
   };

   return (
      <Formik
         initialValues={{ password: '', confirmedPassword: '' }}
         validationSchema={validationSchema}
         onSubmit={handleSubmit}
      >
         {({ values, errors, touched, handleChange, handleBlur, handleSubmit }) => (
            <form onSubmit={handleSubmit} className="FormResetPassword">
               <ThemedPasswordField
                  variant="outlined"
                  size="small"
                  label="Hasło"
                  name="password"
                  className="FormResetPassword__input"
                  onChange={handleChange}
                  onBlur={handleBlur}
                  value={values.password}
                  error={touched.password && errors.password ? true : false}
                  helperText={touched.password && errors.password}
                  disabled={loading}
               />

               <ThemedPasswordField
                  variant="outlined"
                  size="small"
                  label="Potwierdź hasło"
                  name="confirmedPassword"
                  className="FormResetPassword__input"
                  onChange={handleChange}
                  onBlur={handleBlur}
                  value={values.confirmedPassword}
                  error={touched.confirmedPassword && errors.confirmedPassword ? true : false}
                  helperText={touched.confirmedPassword && errors.confirmedPassword}
                  disabled={loading}
               />

               <div className="FormResetPassword__button">
                  <ThemedButton type="submit" color="primary" disabled={loading}>
                     Zmień hasło
                  </ThemedButton>
               </div>
               <span
                  className={`FormResetPassword__notification FormResetPassword__notification--${notificationVariant}`}
               >
                  {notificationMessage}
               </span>
            </form>
         )}
      </Formik>
   );
};

export default memo(FormResetPassword);
