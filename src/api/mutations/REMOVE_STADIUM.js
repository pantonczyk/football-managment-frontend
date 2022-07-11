import { gql } from '@apollo/client';

const REMOVE_STADIUM = gql`
   mutation REMOVE_STADIUM($stadiumGid: ID!) {
      removeStadium(stadiumGid: $stadiumGid) {
         removed
      }
   }
`;

export default REMOVE_STADIUM;
