import { gql } from '@apollo/client';

const UPDATE_PLAYER = gql`
   mutation UPDATE_PLAYER(
      $firstName: String
      $lastName: String
      $dateOfBirth: DateTime
      $height: Decimal
      $weight: Decimal
      $photo: Upload
      $playerNumber: Int
      $positionGid: ID
      $playerGid: ID!
   ) {
      updatePlayer(
         firstName: $firstName
         lastName: $lastName
         dateOfBirth: $dateOfBirth
         height: $height
         weight: $weight
         photo: $photo
         playerNumber: $playerNumber
         positionGid: $positionGid
         playerGid: $playerGid
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

export default UPDATE_PLAYER;
