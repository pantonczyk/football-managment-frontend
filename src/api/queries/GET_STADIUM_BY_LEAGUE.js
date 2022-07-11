import { gql } from '@apollo/client';

const GET_STADIUM_BY_LEAGUE = gql`
   query GET_STADIUM_BY_LEAGUE($leagueGid: ID!) {
      stadiumsByLeague(leagueGid: $leagueGid) {
         id
         name
         address
         league {
            id
            name
         }
      }
   }
`;

export default GET_STADIUM_BY_LEAGUE;
