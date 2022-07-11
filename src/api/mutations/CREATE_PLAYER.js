import { gql } from '@apollo/client';

const CREATE_PLAYER = gql`
   mutation CREATE_PLAYER(
      $firstName: String!
      $lastName: String!
      $dateOfBirth: DateTime!
      $height: Decimal
      $weight: Decimal
      $photo: Upload
      $playerNumber: Int
      $positionGid: ID!
      $teamGid: ID!
   ) {
      createPlayer(
         firstName: $firstName
         lastName: $lastName
         dateOfBirth: $dateOfBirth
         height: $height
         weight: $weight
         photo: $photo
         playerNumber: $playerNumber
         positionGid: $positionGid
         teamGid: $teamGid
      ) {
         player {
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
      }
   }
`;

export default CREATE_PLAYER;
