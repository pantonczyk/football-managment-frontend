import { gql } from '@apollo/client';

const CREATE_LEAGUE = gql`
   mutation CREATE_LEAGUE(
      $name: String!
      $shortName: String!
      $description: String!
      $isSplit: Boolean!
      $leagueSize: Int!
      $splitOneStartDate: DateTime!
      $splitTwoStartDate: DateTime
   ) {
      createLeague(
         name: $name
         shortName: $shortName
         description: $description
         isSplit: $isSplit
         leagueSize: $leagueSize
         splitOneStartDate: $splitOneStartDate
         splitTwoStartDate: $splitTwoStartDate
      ) {
         league {
            id
            name
            shortName
            description
            leagueSize
            teamsCount
            isSplit
            splitOneStartDate
            splitTwoStartDate
            isEnded
            organizer {
               id
               username
               firstName
               lastName
            }
         }
      }
   }
`;

export default CREATE_LEAGUE;
