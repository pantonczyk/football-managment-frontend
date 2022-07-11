import { useContext, useEffect } from 'react';
import { useLocation } from 'react-router';

import { BreadcrumbsDispatchContext, BreadcrumbsStateContext } from './Context';

export default function useBreadcrumbs(parameters, dependencies = []) {
   const { breadcrumbs } = useContext(BreadcrumbsStateContext);
   const dispatch = useContext(BreadcrumbsDispatchContext);
   const location = useLocation();

   useEffect(() => {
      dispatch({ payload: { ...parameters }, action: { type: 'PARAMETERS' } });
      // eslint-disable-next-line react-hooks/exhaustive-deps
   }, [...dependencies, location]);

   const refresh = (params) => {
      dispatch({ payload: { ...params }, action: { type: 'PARAMETERS' } });
   };

   return { breadcrumbs, refresh };
}
