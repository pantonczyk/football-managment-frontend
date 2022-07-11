import { gql } from '@apollo/client';

const UDPATE_LEAGUE = gql`
   mutation UDPATE_LEAGUE(
      $leagueGid: ID!
      $name: String
      $shortName: String
      $description: String
   ) {
      updateLeague(
         leagueGid: $leagueGid
         name: $name
         shortName: $shortName
         description: $description
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
               email
            }
         }
      }
   }
`;

export default UDPATE_LEAGUE;
