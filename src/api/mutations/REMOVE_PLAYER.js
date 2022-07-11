import { gql } from '@apollo/client';

const REMOVE_PLAYER = gql`
   mutation REMOVE_PLAYER($playerGid: ID!) {
      removePlayer(playerGid: $playerGid) {
         removed
      }
   }
`;

export default REMOVE_PLAYER;
