import React, { memo } from 'react';
import { Redirect, Route } from 'react-router-dom';
import { useQuery } from '@apollo/client';
import { oneOfType, objectOf, string, any, bool, func } from 'prop-types';

import { getSession } from 'api/manageSession';
import GET_CURRENT_USER from 'api/queries/GET_CURRENT_USER';

import Loader from 'components/Loader';

const PrivateRoute = ({
   component: Component,
   path,
   exact = false,
   requiredRols,
   children,
   ...rest
}) => {
   const sesion = getSession();
   const accessToken = sesion?.token;
   const { data, loading } = useQuery(GET_CURRENT_USER, {
      fetchPolicy: 'network-only',
   });

   if (loading) {
      return <Loader />;
   }
   const userRole = data?.me?.groups[0]?.name;
   const userHasRequiredRols = requiredRols.includes(userRole);

   return (
      <Route
         exact={exact}
         path={path}
         render={(props) =>
            accessToken ? (
               userHasRequiredRols ? (
                  <Component {...props}>{children}</Component>
               ) : (
                  <Redirect
                     to={{
                        pathname: '/access-denied',
                        state: { from: props.location },
                     }}
                  />
               )
            ) : (
               <Redirect
                  to={{
                     pathname: '/login',
                     state: { from: props.location },
                  }}
               />
            )
         }
         {...rest}
      />
   );
};

PrivateRoute.propTypes = {
   exact: bool,
   path: string,
   component: oneOfType([objectOf(any), func]),
};

export default memo(PrivateRoute);
