/* eslint-disable arrow-body-style */
import React from 'react';

import useBreadcrumbs from './useBreadcrumbs';

export default (parameters = {}) =>
   (WrappedComponent) => {
      return (props) => {
         const { breadcrumbs, refresh } = useBreadcrumbs(parameters, []);

         return (
            <WrappedComponent {...props} breadcrumbs={breadcrumbs} refreshBreadcrumbs={refresh} />
         );
      };
   };
