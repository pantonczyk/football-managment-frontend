import { gql } from '@apollo/client';

const GET_PLAYER = gql`
   query GET_PLAYER($playerGid: ID!) {
      player(playerGid: $playerGid) {
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
`;

export default GET_PLAYER;
