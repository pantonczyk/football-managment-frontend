import { gql } from '@apollo/client';

const GET_STADIUM_AVAILABILITIES_BY_LEAGUE = gql`
   query GET_STADIUM_AVAILABILITIES_BY_LEAGUE($leagueGid: ID!) {
      stadiumAvailabilitiesByLeague(leagueGid: $leagueGid) {
         id
         day
         startHour
         endHour
         stadium {
            id
            name
         }
      }
   }
`;

export default GET_STADIUM_AVAILABILITIES_BY_LEAGUE;
