import { gql } from '@apollo/client';

const REMOVE_STADIUM_AVAILABILITY = gql`
   mutation REMOVE_STADIUM_AVAILABILITY($stadiumAvailabilityGid: ID!) {
      removeStadiumAvailability(stadiumAvailabilityGid: $stadiumAvailabilityGid) {
         removed
      }
   }
`;

export default REMOVE_STADIUM_AVAILABILITY;
