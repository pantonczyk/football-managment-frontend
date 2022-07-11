import React from 'react';
import { oneOfType, arrayOf, node } from 'prop-types';

import Logo from 'images/logo.svg';
import './AuthViewWrapper.scss';

const AuthViewWrapper = ({ children }) => {
   return (
      <section className="auth__wrapper">
         <section className="auth">
            <div className="auth__logo">
               <img src={Logo} alt="Logo Football managment" className="logo" />
               <span>
                  Football
                  <br /> Managment
               </span>
            </div>

            <div className="auth__content">{children}</div>

            <div className="auth__policy">
               <p>©2022 Wszelkie prawa zastrzeżone.</p>
            </div>
         </section>
         <section className="auth__image">
            <div className="overlay" />
         </section>
      </section>
   );
};

AuthViewWrapper.propTypes = {
   children: oneOfType([arrayOf(node), node]),
};

export default AuthViewWrapper;
