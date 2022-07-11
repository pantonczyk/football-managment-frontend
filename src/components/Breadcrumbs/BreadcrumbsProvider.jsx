import React, { memo, useReducer } from 'react';
import { useLocation } from 'react-router';

import isFunction from 'utils/isFunction';
import { BreadcrumbsDispatchContext, BreadcrumbsStateContext } from './Context';
import getBreadcrumbs from './getBreadcrumbs';

const reducer =
   ({ commonReplace, commonRemove, pathname, t }) =>
   (prev, { payload, action }) => {
      const { breadcrumbs: newBreadcrumbs } = getBreadcrumbs(pathname);
      const replace = { ...prev?.replace, ...(payload?.replace || {}) };
      const remove = [...prev?.remove];

      [...(payload?.remove || []), ...commonRemove].forEach((element) => {
         if (!remove.includes(element)) {
            remove.push(element);
         }
      });

      switch (action?.type) {
         case 'PARAMETERS':
            return {
               remove: [...remove],
               replace: { ...replace },
               breadcrumbs: newBreadcrumbs.reduce((bc, curr) => {
                  const replaceKeys = [
                     ...new Set([
                        ...Object.keys(isFunction(commonReplace) ? commonReplace() : commonReplace),
                        ...Object.keys(replace),
                     ]),
                  ];
                  if (replaceKeys.includes(curr?.name)) {
                     return [
                        ...bc,
                        {
                           name:
                              replace[curr?.name] ||
                              (isFunction(commonReplace)
                                 ? commonReplace(t)[curr?.name]
                                 : commonReplace[curr?.name]),
                           url: curr?.url,
                        },
                     ];
                  }
                  if (remove.includes(curr?.name)) return [...bc];
                  return [...bc, curr];
               }, []),
            };
         default:
            break;
      }
   };

const BreadcrumbsProvider = ({ commonReplace = {}, commonRemove = [], children }) => {
   const location = useLocation();
   const { pathname } = location;
   const { breadcrumbs } = getBreadcrumbs(pathname);
   const [state, dispatch] = useReducer(reducer({ commonReplace, commonRemove, pathname }), {
      replace: {},
      remove: [],
      breadcrumbs,
   });

   return (
      <BreadcrumbsDispatchContext.Provider value={dispatch}>
         <BreadcrumbsStateContext.Provider value={state}>
            {children}
         </BreadcrumbsStateContext.Provider>
      </BreadcrumbsDispatchContext.Provider>
   );
};

export default memo(BreadcrumbsProvider);
