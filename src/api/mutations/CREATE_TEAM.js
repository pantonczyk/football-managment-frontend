import { gql } from '@apollo/client';

const CREATE_TEAM = gql`
   mutation CREATE_TEAM($name: String!, $shortName: String!) {
      createTeam(name: $name, shortName: $shortName) {
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

export default CREATE_TEAM;
