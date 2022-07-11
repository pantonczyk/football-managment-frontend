import { gql } from '@apollo/client';

const CREATE_STADIUM_AVAILABILITY = gql`
   mutation CREATE_STADIUM_AVAILABILITY(
      $day: Int!
      $startHour: Time!
      $endHour: Time!
      $stadiumGid: ID!
   ) {
      createStadiumAvailability(
         day: $day
         startHour: $startHour
         endHour: $endHour
         stadiumGid: $stadiumGid
      ) {
         stadiumAvailability {
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
   }
`;

export default CREATE_STADIUM_AVAILABILITY;
