import { gql } from '@apollo/client';

const GET_LEAGUE_TEAM = gql`
   query GET_LEAGUE_TEAM($teamGid: ID!) {
      team(teamGid: $teamGid) {
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
         representative {
            id
            username
            firstName
            lastName
            email
         }
      }
   }
`;

export default GET_LEAGUE_TEAM;
