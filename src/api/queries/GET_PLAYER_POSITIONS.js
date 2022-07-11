import { gql } from '@apollo/client';

const GET_PLAYER_POSITIONS = gql`
   query GET_PLAYER_POSITIONS {
      playerPositions {
         id
         name
      }
   }
`;

export default GET_PLAYER_POSITIONS;
