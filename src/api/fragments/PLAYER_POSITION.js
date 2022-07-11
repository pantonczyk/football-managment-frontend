import { gql } from '@apollo/client';

const PLAYER_POSITION = gql`
   fragment PlayerPositionFragment on PlayerPositionNode {
      id
      name
   }
`;

export default PLAYER_POSITION;
