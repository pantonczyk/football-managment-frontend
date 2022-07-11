import React, { memo } from 'react';
import { bool, string, func } from 'prop-types';

import ThemedTextField from 'components/ThemedTextField';
import ThemedPasswordField from 'components/ThemedPasswordField';
import ThemedCheckbox from 'components/ThemedCheckbox';
import ThemedButton from 'components/ThemedButton';
import UnderlineButton from 'components/UnderlineButton';
import Loader from 'components/Loader';

import AuthViewWrapper from '../../AuthViewWrapper';

import './LoginContent.scss';

const LoginContent = ({
   email = '',
   setEmail,
   password = '',
   setPassword,
   signIn,
   rememberCredentials,
   toggleRememberCredentials,
   errorMessage,
   loading,
}) => {
   return (
      <AuthViewWrapper>
         <form className="login">
            <h1>Logowanie Football Managment</h1>

            <ThemedTextField
               variant="outlined"
               label="E-mail"
               name="email"
               className="form__input"
               type="email"
               value={email}
               onChange={(event) => setEmail(event.target.value)}
            />

            <ThemedPasswordField
               variant="outlined"
               label="Hasło"
               name="password"
               value={password}
               className="form__input"
               onChange={(event) => setPassword(event.target.value)}
            />

            <ThemedCheckbox
               checked={rememberCredentials}
               label="Zapamiętaj mnie"
               name="rememberChatter"
               onChange={(event) => {
                  toggleRememberCredentials(event.target.checked);
               }}
            />

            <div className="form__buttons">
               <UnderlineButton type="link" href="/register">
                  Rejestracja
               </UnderlineButton>

               <ThemedButton onClick={signIn} disabled={loading}>
                  Zaloguj
               </ThemedButton>
            </div>
            <div>
               {loading && <Loader />}
               <p className="form__errors">{errorMessage}</p>
            </div>
         </form>
      </AuthViewWrapper>
   );
};

LoginContent.propTypes = {
   email: string,
   setEmail: func,
   password: string,
   setPassword: func,
   signIn: func,
   rememberCredentials: bool,
   toggleRememberCredentials: func,
   errorMessage: string,
   loading: bool,
};

export default memo(LoginContent);
