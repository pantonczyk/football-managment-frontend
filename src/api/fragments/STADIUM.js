import { gql } from '@apollo/client';

const STADIUM = gql`
   fragment StadiumFragment on StadiumNode {
      id
      name
      address
      league {
         id
         name
      }
   }
`;

export default STADIUM;
