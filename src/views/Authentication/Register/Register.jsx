import React, { memo, useState } from 'react';
import * as Yup from 'yup';
import { useQuery, useMutation } from '@apollo/client';
import { useHistory } from 'react-router-dom';

import convertIdToGid from 'utils/convertIdToGid';

import GET_GROUPS from 'api/queries/GET_GROUPS';
import REGISTER_USER from 'api/mutations/REGISTER_USER';

import RegisterContent from './RegisterContent';

const Register = () => {
   const [groupsList, setGroupsList] = useState([]);
   const [errorMessage, setErrorMessage] = useState('');
   const history = useHistory();

   useQuery(GET_GROUPS, {
      onCompleted: (data) => {
         setGroupsList(data?.groups);
      },
   });

   const initialValues = {
      username: '',
      email: '',
      firstName: '',
      lastName: '',
      password: '',
      passwordConfirm: '',
      role: '',
   };

   const validationSchema = Yup.object().shape({
      username: Yup.string().required('To pole jest wymagane!'),
      email: Yup.string().email('Wprowadź poprawny email').required('To pole jest wymagane!'),
      firstName: Yup.string()
         .required('To pole jest wymagane!')
         .matches(/^[\s\p{L}]+$/u, 'Wprowadź poprawne dane'),
      lastName: Yup.string()
         .required('To pole jest wymagane!')
         .matches(/^[\s\p{L}]+$/u, 'Wprowadź poprawne dane'),
      password: Yup.string()
         .required('To pole jest wymagane!')
         .matches(
            /^.*(?=.{8,})((?=.*[!@#$%^&*()\-_=+{};:,<.>]){1})(?=.*\d)((?=.*[a-z]){1})((?=.*[A-Z]){1}).*$/,
            'Hasło musi składać się z 8 znaków, w tym z wielkiej i małej litery, cyfry i jednego znaku specjalnego'
         ),
      passwordConfirm: Yup.string()
         .required('To pole jest wymagane!')
         .when('password', {
            is: (password) => password?.length,
            then: Yup.string().oneOf([Yup.ref('password')], 'Hasła muszą być takie same.'),
         }),
      role: Yup.string().required('To pole jest wymagane!'),
   });

   const registerWasSuccessful = () => {
      history.push('/login');
   };

   const [registerUserMutation, { loading }] = useMutation(REGISTER_USER);

   const registerUser = ({
      username,
      email,
      firstName,
      lastName,
      password,
      passwordConfirm,
      role,
   }) => {
      setErrorMessage('');
      const roleGid = convertIdToGid('GroupProxyNode', role);

      registerUserMutation({
         variables: {
            username,
            email,
            firstName,
            lastName,
            password,
            passwordConfirm,
            roleGid,
         },
      })
         .then(registerWasSuccessful)
         .catch((error) => setErrorMessage(error.message));
   };

   const handleSubmit = (values) => {
      registerUser(values);
   };

   return (
      <RegisterContent
         groupsList={groupsList}
         initialValues={initialValues}
         validationSchema={validationSchema}
         handleSubmit={handleSubmit}
         loading={loading}
         errorMessage={errorMessage}
      />
   );
};

export default memo(Register);
