import React from 'react';
import { Redirect } from 'react-router-dom';

import { userRoles } from 'api/utils/userRoles';

export const defaultRouteConditionalRedirect = (sesion) => {
   const accessToken = sesion?.token;
   const currentUserRole = sesion?.currentUserRole;

   if (accessToken) {
      if (currentUserRole === userRoles.leagueOrganizer) {
         return <Redirect to="/league-organizer" />;
      } else if (currentUserRole === userRoles.teamRepresentative) {
         return <Redirect to="/team-representative/teams" />;
      }
   }

   return <Redirect to="/login" />;
};

export const redirectTo = (history, path) => () => {
   history.push(path);
};

export const goBack = (history) => () => {
   history.goBack();
};

export const conditionalGoBack = (history, path) => () => {
   if (history.length) history.goBack();
   else history.push(path);
};
