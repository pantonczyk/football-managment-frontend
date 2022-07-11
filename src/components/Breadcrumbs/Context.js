import { createContext } from 'react';

export const BreadcrumbsStateContext = createContext({ breadcrumbs: [] });
export const BreadcrumbsDispatchContext = createContext(() => {});
