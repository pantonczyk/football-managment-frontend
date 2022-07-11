import { gql } from '@apollo/client';

const REMOVE_PLAYER_PHOTO = gql`
   mutation REMOVE_PLAYER_PHOTO($playerGid: ID!) {
      removePlayerPhoto(playerGid: $playerGid) {
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

export default REMOVE_PLAYER_PHOTO;
