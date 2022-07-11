import { gql } from '@apollo/client';

const GET_GROUPS = gql`
   query GET_GROUPS {
      groups {
         id
         name
      }
   }
`;

export default GET_GROUPS;
