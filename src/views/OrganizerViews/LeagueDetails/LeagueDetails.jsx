import React, { useState, useMemo } from 'react';
import { useRouteMatch, useParams, Redirect } from 'react-router-dom';
import { useQuery } from '@apollo/client';

import GET_LEAGUE from 'api/queries/GET_LEAGUE';
import { userRoles } from 'api/utils/userRoles';

import useBreadcrumbs from 'components/Breadcrumbs/useBreadcrumbs';
import Loader from 'components/Loader';
import PrivateRoute from 'components/PrivateRoute';

import LeagueTabsNav from './LeagueTabsNav';
import LeagueOverviewTab from './LeagueOverviewTab';
import LeagueManageTab from './LeagueManageTab';
import StadiumAvailabilityManage from './StadiumAvailabilityManage';
import TeamsTab from './TeamsTab';
import LeagueStandingTab from './LeagueStandingTab';
import LeagueScheduleTab from './LeagueScheduleTab';
import LeagueMatchManage from './LeagueMatchManage';
import LeagueStatisticsTab from './LeagueStatisticsTab';

const LeagueDetails = () => {
   const [leagueData, setLeagueData] = useState();
   const { leagueGid } = useParams();
   const { path, url } = useRouteMatch();

   useBreadcrumbs(
      {
         replace: {
            [leagueGid]: leagueData?.shortName,
         },
      },
      [leagueData]
   );

   const { data, loading } = useQuery(GET_LEAGUE, {
      variables: {
         leagueGid,
      },
   });

   useMemo(() => {
      setLeagueData(data?.league);
   }, [data]);

   if (loading) {
      return <Loader />;
   }

   return (
      <>
         <LeagueTabsNav />
         <PrivateRoute
            path={url}
            requiredRols={[userRoles.leagueOrganizer]}
            render={() => <Redirect to={`${url}/overview`} />}
         />
         <PrivateRoute
            path={`${path}/overview`}
            requiredRols={[userRoles.leagueOrganizer]}
            component={() => <LeagueOverviewTab leagueGid={leagueGid} />}
         />
         <PrivateRoute
            path={`${path}/league-manage`}
            exact
            requiredRols={[userRoles.leagueOrganizer]}
            component={() => <LeagueManageTab leagueGid={leagueGid} />}
         />
         <PrivateRoute
            path={`${path}/league-manage/stadium/:stadiumGid`}
            requiredRols={[userRoles.leagueOrganizer]}
            component={StadiumAvailabilityManage}
         />
         <PrivateRoute
            path={`${path}/teams`}
            exact
            requiredRols={[userRoles.leagueOrganizer]}
            component={() => <TeamsTab leagueGid={leagueGid} />}
         />
         <PrivateRoute
            path={`${path}/league-standing`}
            requiredRols={[userRoles.leagueOrganizer]}
            component={LeagueStandingTab}
         />
         <PrivateRoute
            path={`${path}/league-schedule`}
            exact
            requiredRols={[userRoles.leagueOrganizer]}
            component={() => <LeagueScheduleTab leagueGid={leagueGid} />}
         />
         <PrivateRoute
            path={`${path}/league-schedule/match/:matchGid`}
            requiredRols={[userRoles.leagueOrganizer]}
            component={LeagueMatchManage}
         />
         <PrivateRoute
            path={`${path}/league-statistics`}
            requiredRols={[userRoles.leagueOrganizer]}
            component={LeagueStatisticsTab}
         />
      </>
   );
};

export default LeagueDetails;
