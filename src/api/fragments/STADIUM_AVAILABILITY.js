import { gql } from '@apollo/client';

const STADIUM_AVAILABILITY = gql`
   fragment StadiumAvailabilityFragment on StadiumAvailabilityNode {
      id
      day
      startHour
      endHour
      stadium {
         id
         name
      }
   }
`;

export default STADIUM_AVAILABILITY;
