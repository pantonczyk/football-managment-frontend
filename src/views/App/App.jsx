import React, { memo, lazy, Suspense } from 'react';
import { BrowserRouter, Switch, Route, Redirect } from 'react-router-dom';
import { ApolloProvider } from '@apollo/client';

import { client } from 'api/client';
import { getSession } from 'api/manageSession';
import { userRoles } from 'api/utils/userRoles';
import { defaultRouteConditionalRedirect } from 'utils/routerFunctions';

import PrivateRoute from 'components/PrivateRoute';
import BreadcrumbsProvider from 'components/Breadcrumbs/BreadcrumbsProvider.jsx';
import commonReplace from 'components/Breadcrumbs/commonReplace';
import LoadingScreen from 'components/LoadingScreen';
import Layout from 'layout';

const Login = lazy(() => import('views/Authentication/Login'));
const Register = lazy(() => import('views/Authentication/Register'));
const PageAccessDenied = lazy(() => import('views/PageAccessDenied'));
const PageNotFound = lazy(() => import('views/PageNotFound'));

// Common Views
import UserProfile from 'views/UserProfile';

//  League Organizer Views
import OrganizerDashboard from 'organizerViews/OrganizerDashboard';
import CreateLeague from 'organizerViews/CreateLeague';
import LeagueDetails from 'organizerViews/LeagueDetails';
import LeagueTeamDetails from 'organizerViews/LeagueTeamDetails';

//  Team Representative Views
import TeamRepresentativeDashboard from 'teamRepresentativeViews/TeamRepresentativeDashboard';
import CreateTeam from 'teamRepresentativeViews/CreateTeam';
import TeamDetails from 'teamRepresentativeViews/TeamDetails';
import PlayerDetails from 'teamRepresentativeViews/PlayerDetails';

import 'styles/global.scss';

const App = () => {
   const sesion = getSession();

   return (
      <ApolloProvider client={client}>
         <BrowserRouter>
            <BreadcrumbsProvider commonReplace={commonReplace}>
               <Switch>
                  <Route exact path="/" render={() => defaultRouteConditionalRedirect(sesion)} />

                  <Route path="/login">
                     <Suspense fallback={<LoadingScreen />}>
                        <Login />
                     </Suspense>
                  </Route>

                  <Route path="/register">
                     <Suspense fallback={<LoadingScreen />}>
                        <Register />
                     </Suspense>
                  </Route>

                  <Route
                     path={[
                        '/league-organizer',
                        '/league-organizer/leagues',
                        '/league-organizer/leagues/:leagueGid',
                        '/league-organizer/leagues/:leagueGid/teams/:teamGid',
                        '/league-organizer/create-league',
                        '/league-organizer/user-profile',
                     ]}
                  >
                     <Switch>
                        <Layout>
                           <PrivateRoute
                              path="/league-organizer"
                              exact
                              requiredRols={[userRoles.leagueOrganizer]}
                              render={() => <Redirect to="/league-organizer/leagues" />}
                           />
                           <PrivateRoute
                              path="/league-organizer/leagues"
                              exact
                              component={OrganizerDashboard}
                              requiredRols={[userRoles.leagueOrganizer]}
                           />
                           <PrivateRoute
                              path="/league-organizer/leagues/:leagueGid"
                              component={LeagueDetails}
                              requiredRols={[userRoles.leagueOrganizer]}
                           />
                           <PrivateRoute
                              path="/league-organizer/leagues/:leagueGid/teams/:teamGid"
                              component={LeagueTeamDetails}
                              requiredRols={[userRoles.leagueOrganizer]}
                           />
                           <PrivateRoute
                              path="/league-organizer/create-league"
                              component={CreateLeague}
                              requiredRols={[userRoles.leagueOrganizer]}
                           />
                           <PrivateRoute
                              path="/league-organizer/user-profile"
                              component={UserProfile}
                              requiredRols={[userRoles.leagueOrganizer]}
                           />
                        </Layout>
                     </Switch>
                  </Route>

                  <Route
                     path={[
                        '/team-representative',
                        '/team-representative/teams',
                        '/team-representative/teams/:teamGid',
                        '/team-representative/teams/:teamGid/player/:playerGid',
                        '/team-representative/create-team',
                        '/team-representative/user-profile',
                     ]}
                  >
                     <Switch>
                        <Layout>
                           <PrivateRoute
                              path="/team-representative"
                              exact
                              requiredRols={[userRoles.teamRepresentative]}
                              render={() => <Redirect to="/team-representative/teams" />}
                           />
                           <PrivateRoute
                              path="/team-representative/teams"
                              exact
                              component={TeamRepresentativeDashboard}
                              requiredRols={[userRoles.teamRepresentative]}
                           />
                           <PrivateRoute
                              path="/team-representative/teams/:teamGid"
                              component={TeamDetails}
                              requiredRols={[userRoles.teamRepresentative]}
                           />
                           <PrivateRoute
                              path="/team-representative/teams/:teamGid/team-composition/:playerGid"
                              component={PlayerDetails}
                              requiredRols={[userRoles.teamRepresentative]}
                           />
                           <PrivateRoute
                              path="/team-representative/create-team"
                              component={CreateTeam}
                              requiredRols={[userRoles.teamRepresentative]}
                           />
                           <PrivateRoute
                              path="/team-representative/user-profile"
                              component={UserProfile}
                              requiredRols={[userRoles.teamRepresentative]}
                           />
                        </Layout>
                     </Switch>
                  </Route>

                  <Route exact path="/access-denied">
                     <Suspense fallback={<LoadingScreen />}>
                        <PageAccessDenied />
                     </Suspense>
                  </Route>

                  <Route exact path="*">
                     <Suspense fallback={<LoadingScreen />}>
                        <PageNotFound />
                     </Suspense>
                  </Route>
               </Switch>
            </BreadcrumbsProvider>
         </BrowserRouter>
      </ApolloProvider>
   );
};

export default memo(App);
