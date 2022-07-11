import { gql } from '@apollo/client';

const REMOVE_TEAM = gql`
   mutation REMOVE_TEAM($teamGid: ID!) {
      removeTeam(teamGid: $teamGid) {
         removed
      }
   }
`;

export default REMOVE_TEAM;
