import { gql } from '@apollo/client';

const UPDATE_STADIUM_AVAILABILITY = gql`
   mutation UPDATE_STADIUM_AVAILABILITY($day: Int, startHour: Time, $endHour: Time, $stadiumAvailabilityGid: ID!) {
      updateStadiumAvailability(day: $day, startHour: $startHour, endHour: $endHour, stadiumGid: $stadiumGid ) {
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

export default UPDATE_STADIUM_AVAILABILITY;
