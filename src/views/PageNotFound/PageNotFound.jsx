import React, { memo } from 'react';
import { withRouter } from 'react-router';

import { conditionalGoBack } from 'utils/routerFunctions';

import ThemedButton from 'components/ThemedButton';

import Logo from 'images/logo.svg';
import EmptyFootballDressingRoom from 'images/emptyFootballDressingRoom.jpg';

import './PageNotFound.scss';

const PageNotFound = ({ history }) => {
   return (
      <section className="notFound">
         <div className="notFound__logo">
            <img src={Logo} alt="Logo Football managment" className="logo" />
            <span>
               Football
               <br /> Managment
            </span>
         </div>
         <main className="notFound__main">
            <h1 className="main__title">404</h1>
            <p className="main__subtitle">Strony nie znaleziono</p>
            <img src={EmptyFootballDressingRoom} alt="Pusta szatnia piłkarska" />
            <div className="main__information">
               <h2>Widzisz? Nikogo tu nie ma...</h2>
               <p>strona, której szukasz, jest niedostępna! </p>
               <ThemedButton variant="outlined" onClick={conditionalGoBack(history, '/')}>
                  Powrót
               </ThemedButton>
            </div>
         </main>
         <div className="notFound__policy">
            <p>©2021 Wszelkie prawa zastrzeżone.</p>
         </div>
      </section>
   );
};

export default memo(withRouter(PageNotFound));
