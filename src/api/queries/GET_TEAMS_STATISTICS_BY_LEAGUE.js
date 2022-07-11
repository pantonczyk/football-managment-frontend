import { gql } from '@apollo/client';

const GET_TEAMS_STATISTICS_BY_LEAGUE = gql`
   query GET_TEAMS_STATISTICS_BY_LEAGUE($leagueGid: ID!) {
      teamsStatistics(leagueGid: $leagueGid) {
         id
         position
         name
         shortName
         matchesPlayed
         points
         goalsScored
         assists
         saves
         yellowCards
         redCards
         matchResults
         percentageMatchResults
         goalsRatio
      }
   }
`;

export default GET_TEAMS_STATISTICS_BY_LEAGUE;
