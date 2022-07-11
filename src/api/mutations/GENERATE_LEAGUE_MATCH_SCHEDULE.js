import { gql } from '@apollo/client';

const GENERATE_LEAGUE_MATCH_SCHEDULE = gql`
   mutation GENERATE_LEAGUE_MATCH_SCHEDULE($leagueGid: ID!) {
      generateLeagueMatchSchedule(leagueGid: $leagueGid) {
         success
      }
   }
`;

export default GENERATE_LEAGUE_MATCH_SCHEDULE;
