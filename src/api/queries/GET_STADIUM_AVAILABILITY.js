import { gql } from '@apollo/client';

const GET_STADIUM_AVAILABILITY = gql`
   query GET_STADIUM_AVAILABILITY($stadiumAvailabilityGid: ID!) {
      stadiumAvailability(stadiumAvailabilityGid: $stadiumAvailabilityGid) {
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

export default GET_STADIUM_AVAILABILITY;
