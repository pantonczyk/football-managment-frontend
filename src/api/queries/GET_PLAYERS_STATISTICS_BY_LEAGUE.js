import { gql } from '@apollo/client';

const GET_PLAYERS_STATISTICS_BY_LEAGUE = gql`
   query GET_PLAYERS_STATISTICS_BY_LEAGUE($leagueGid: ID!, $filterPhrase: String) {
      playersByLeague(leagueGid: $leagueGid, filterPhrase: $filterPhrase) {
         id
         firstName
         lastName
         extendedName
         goals
         assists
         saves
         yellowCards
         redCards
         team {
            name
            shortName
         }
         position {
            id
            name
         }
      }
   }
`;

export default GET_PLAYERS_STATISTICS_BY_LEAGUE;
