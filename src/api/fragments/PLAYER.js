import { gql } from '@apollo/client';

const PLAYER = gql`
   fragment PlayerFragment on PlayerNode {
      id
      firstName
      lastName
      height
      weight
      dateOfBirth
      playerNumber
      goals
      assists
      saves
      redCards
      yellowCards
      team {
         representative {
            username
            email
         }
      }
      photo
      position {
         id
         name
      }
   }
`;

export default PLAYER;
