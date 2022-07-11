import React, { Suspense, memo, useState, useMemo } from 'react';
import { useQuery } from '@apollo/client';
import { oneOfType, arrayOf, node } from 'prop-types';

import GET_CURRENT_USER from 'api/queries/GET_CURRENT_USER';

import Sidebar from 'components/Sidebar';
import Navbar from 'components/Navbar';

import './Layout.scss';

const Layout = ({ children }) => {
   const [currentUser, setCurrentUser] = useState(null);

   const { data } = useQuery(GET_CURRENT_USER);

   useMemo(() => {
      setCurrentUser(data?.me);
   }, [data]);

   return (
      <>
         <div id="root-header" />
         <div id="root-content">
            <div className="layout">
               <Sidebar userRole={currentUser?.groups[0]?.name} />
               <section className="content-wrapper">
                  <Navbar userData={currentUser} />

                  <main id="root-main" className="layout__main">
                     <Suspense>{children}</Suspense>
                  </main>
               </section>
            </div>
         </div>
         <div id="root-bottom" />
      </>
   );
};

Layout.propTypes = {
   children: oneOfType([arrayOf(node), node]),
};

export default memo(Layout);
