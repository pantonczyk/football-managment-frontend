import { gql } from '@apollo/client';

const UPDATE_TEAM = gql`
   mutation UPDATE_TEAM($name: String!, $shortName: String!, $teamGid: ID!) {
      updateTeam(name: $name, shortName: $shortName, teamGid: $teamGid) {
         team {
            id
            name
            shortName
            won
            draw
            lost
            goalsScored
            goalsLost
            goalsDiff
            points
            position
            league {
               id
               name
               organizer {
                  id
                  firstName
                  lastName
                  email
               }
            }
            representative {
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

export default UPDATE_TEAM;
