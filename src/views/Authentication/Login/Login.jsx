import React, { memo, useState, useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import { useMutation } from '@apollo/client';

import { createSession } from 'api/manageSession';
import { userRoles } from 'api/utils/userRoles';
import LOGIN_USER from 'api/mutations/LOGIN_USER';

import LoginContent from './LoginContent';

//  Object names in local storage
const FMAPP_REMEMBER_CREDENTIALS = 'FMAPP_REMEMBER_CREDENTIALS';
const FMAPP__CREDENTIALS = 'FMAPP_CREDENTIALS';

const Login = () => {
   const [email, setEmail] = useState('');
   const [password, setPassword] = useState('');
   const [rememberCredentials, toggleRememberCredentials] = useState(true);
   const [errorMessage, setErrorMessage] = useState();
   const history = useHistory();

   const saveCredentialsData = () => {
      if (rememberCredentials) {
         const FMAppCredentials = {
            email: email,
            password: password,
         };
         localStorage.setItem(FMAPP_REMEMBER_CREDENTIALS, '1');
         localStorage.setItem(FMAPP__CREDENTIALS, JSON.stringify(FMAppCredentials));
      } else {
         localStorage.setItem(FMAPP_REMEMBER_CREDENTIALS, '0');
         localStorage.removeItem(FMAPP__CREDENTIALS);
      }
   };

   const redirectUser = (user) => {
      const currentUserRole = user?.groups[0]?.name;

      if (currentUserRole === userRoles.leagueOrganizer) {
         history.push('/league-organizer');
      } else if (currentUserRole === userRoles.teamRepresentative) {
         history.push('/team-representative/teams');
      } else {
         setErrorMessage('Ups! Coś poszło nie tak, spróbuj jeszcze raz!');
      }
   };

   const [loginUser, { loading }] = useMutation(LOGIN_USER);

   const signIn = async () => {
      setErrorMessage('');
      const { data } = await loginUser({
         variables: { email, password },
      });

      const { success = '', errors = '', token = '', user = {} } = data?.tokenAuth || {};

      if (success) {
         const session = {
            token: token,
            currentUserRole: user?.groups[0]?.name,
         };
         createSession(session);
         saveCredentialsData();
         redirectUser(user);
      }

      if (errors) {
         setErrorMessage('Proszę, podaj prawidłowe dane uwierzytelniające. ');
      }
   };

   useEffect(() => {
      if (localStorage.getItem(FMAPP_REMEMBER_CREDENTIALS) === '1') {
         const credentials = JSON.parse(localStorage.getItem(FMAPP__CREDENTIALS));
         setEmail(credentials?.email);
         setPassword(credentials?.password);
      } else if (localStorage.getItem(FMAPP_REMEMBER_CREDENTIALS) === '0') {
         toggleRememberCredentials(false);
      }
   }, []);

   return (
      <LoginContent
         email={email}
         setEmail={setEmail}
         password={password}
         setPassword={setPassword}
         signIn={signIn}
         rememberCredentials={rememberCredentials}
         toggleRememberCredentials={toggleRememberCredentials}
         errorMessage={errorMessage}
         loading={loading}
      />
   );
};

export default memo(Login);
