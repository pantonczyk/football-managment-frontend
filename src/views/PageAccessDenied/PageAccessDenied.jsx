import React, { memo } from 'react';
import { withRouter } from 'react-router';

import { conditionalGoBack } from 'utils/routerFunctions';

import ThemedButton from 'components/ThemedButton';

import Logo from 'images/logo.svg';
import FootballReferreImage from 'images/footballReferee.png';

import './PageAccessDenied.scss';

const PageAccessDenied = ({ history }) => {
   return (
      <section className="accessDenied">
         <div className="accessDenied__logo">
            <img src={Logo} alt="Logo Football managment" className="logo" />
            <span>
               Football
               <br /> Managment
            </span>
         </div>
         <main className="accessDenied__main">
            <h1 className="main__title">403</h1>
            <p className="main__subtitle">Brak dostępu</p>
            <img
               src={FootballReferreImage}
               alt="Zdjęcie sędziego piłkarskiego pokazującego czerwoną kartkę"
            />
            <div className="main__information">
               <h2>Przepraszamy, ale nie masz dostępu do tej strony...</h2>
               <p>Wróć do poprzedniej strony lub skontaktuj się z administratorem systemu.</p>
               <ThemedButton variant="outlined" onClick={conditionalGoBack(history, '/')}>
                  Powrót
               </ThemedButton>
            </div>
         </main>
         <div className="accessDenied__policy">
            <p>©2021 Wszelkie prawa zastrzeżone.</p>
         </div>
      </section>
   );
};

export default memo(withRouter(PageAccessDenied));
