import { gql } from '@apollo/client';

const GET_STADIUM = gql`
   query GET_STADIUM($stadiumGid: ID!) {
      stadium(stadiumGid: $stadiumGid) {
         id
         name
         address
         league {
            id
            name
         }
      }
   }
`;

export default GET_STADIUM;
