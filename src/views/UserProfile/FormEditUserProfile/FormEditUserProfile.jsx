import React, { memo, useState } from 'react';
import { useMutation } from '@apollo/client';
import * as Yup from 'yup';
import { object } from 'prop-types';

import UPDATE_USER_PROFILE from 'api/mutations/UPDATE_USER_PROFILE';

import FormEditUserProfileContent from './FormEditUserProfileContent';

const FormEditUserProfile = ({ userData }) => {
   const [errorMessage, setErrorMessage] = useState('');
   const [updateUserProfileMutation, { loading }] = useMutation(UPDATE_USER_PROFILE);

   const initialValues = {
      username: userData?.username,
      firstName: userData?.firstName,
      lastName: userData?.lastName,
      email: userData?.email,
   };

   const validationSchema = Yup.object().shape({
      username: Yup.string().required('To pole jest wymagane!'),
      firstName: Yup.string().matches(/^[\s\p{L}]+$/u, 'Wprowadź poprawne dane'),
      lastName: Yup.string().matches(/^[\s\p{L}]+$/u, 'Wprowadź poprawne dane'),
      email: Yup.string().email('Wprowadź poprawny email').required('To pole jest wymagane!'),
   });

   const updateUserProfile = ({ firstName, lastName, username, email }) => {
      setErrorMessage('');
      updateUserProfileMutation({
         variables: {
            username,
            firstName,
            lastName,
            email,
         },
      }).catch((error) => setErrorMessage(error.message));
   };

   const handleSubmit = (values) => {
      updateUserProfile(values);
   };

   return (
      <FormEditUserProfileContent
         initialValues={initialValues}
         validationSchema={validationSchema}
         handleSubmit={handleSubmit}
         loading={loading}
         errorMessage={errorMessage}
      />
   );
};

FormEditUserProfile.propTypes = {
   userData: object,
};

export default memo(FormEditUserProfile);
