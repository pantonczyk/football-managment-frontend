import React, { useState, useMemo } from 'react';
import { useRouteMatch, useParams, Redirect } from 'react-router-dom';
import { useQuery } from '@apollo/client';

import GET_TEAM from 'api/queries/GET_TEAM';
import { userRoles } from 'api/utils/userRoles';

import convertIdToGid from 'utils/convertIdToGid';

import useBreadcrumbs from 'components/Breadcrumbs/useBreadcrumbs';
import Loader from 'components/Loader';
import PrivateRoute from 'components/PrivateRoute';

import TeamTabsNav from './TeamTabsNav';
import OverviewTab from './OverviewTab';
import CompositionTab from './CompositionTab';
import LeagueTab from './LeagueTab';
import TeamMatchScheduleTab from './TeamMatchScheduleTab';
import TeamStatisticsTab from './TeamStatisticsTab';

const TeamDetails = () => {
   const [teamData, setTeamData] = useState();
   const { teamGid } = useParams();
   const { path, url } = useRouteMatch();

   useBreadcrumbs(
      {
         replace: {
            [teamGid]: teamData?.shortName,
         },
      },
      [teamData]
   );

   const { data, loading } = useQuery(GET_TEAM, {
      variables: {
         teamGid,
      },
   });

   useMemo(() => {
      setTeamData(data?.team);
   }, [data]);

   const leagueGid = useMemo(() => {
      return convertIdToGid('LeagueNode', teamData?.league?.id);
   }, [teamData]);

   if (loading) {
      return <Loader />;
   }

   return (
      <>
         <TeamTabsNav />
         <PrivateRoute
            path={url}
            exact
            requiredRols={[userRoles.teamRepresentative]}
            render={() => <Redirect to={`${url}/overview`} />}
         />
         <PrivateRoute
            path={`${path}/overview`}
            requiredRols={[userRoles.teamRepresentative]}
            component={() => (
               <OverviewTab
                  teamGid={teamGid}
                  teamName={teamData?.name}
                  teamShortName={teamData?.shortName}
               />
            )}
         />
         <PrivateRoute
            path={`${path}/team-composition`}
            exact
            requiredRols={[userRoles.teamRepresentative]}
            component={() => <CompositionTab teamGid={teamGid} />}
         />
         <PrivateRoute
            path={`${path}/league`}
            requiredRols={[userRoles.teamRepresentative]}
            component={LeagueTab}
         />
         <PrivateRoute
            path={`${path}/team-match-schedule`}
            requiredRols={[userRoles.teamRepresentative]}
            component={() => <TeamMatchScheduleTab teamGid={teamGid} />}
         />
         <PrivateRoute
            path={`${path}/league-statistics`}
            requiredRols={[userRoles.teamRepresentative]}
            component={() => <TeamStatisticsTab leagueGid={leagueGid} />}
         />
      </>
   );
};

export default TeamDetails;
