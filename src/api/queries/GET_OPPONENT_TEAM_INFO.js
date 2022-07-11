import { gql } from '@apollo/client';

const GET_OPPONENT_TEAM_INFO = gql`
   query GET_OPPONENT_TEAM_INFO($teamGid: ID!, $opponentGid: ID!) {
      opponent(teamGid: $teamGid, opponentGid: $opponentGid) {
         id
         name
         shortName
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

export default GET_OPPONENT_TEAM_INFO;
