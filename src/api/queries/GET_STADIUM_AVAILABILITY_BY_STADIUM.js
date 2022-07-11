import { gql } from '@apollo/client';

const GET_STADIUM_AVAILABILITY_BY_STADIUM = gql`
   query GET_STADIUM_AVAILABILITY_BY_STADIUM($stadiumGid: ID!) {
      stadiumAvailabilitiesByStadium(stadiumGid: $stadiumGid) {
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

export default GET_STADIUM_AVAILABILITY_BY_STADIUM;
