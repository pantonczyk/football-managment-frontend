import { gql } from '@apollo/client';

const REMOVE_LEAGUE = gql`
   mutation REMOVE_LEAGUE($leagueGid: ID!) {
      removeLeague(leagueGid: $leagueGid) {
         removed
      }
   }
`;

export default REMOVE_LEAGUE;
