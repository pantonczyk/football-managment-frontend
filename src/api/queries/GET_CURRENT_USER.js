import { gql } from '@apollo/client';

const GET_CURRENT_USER = gql`
   query GET_CURRENT_USER {
      me {
         id
         username
         firstName
         lastName
         email
         groups {
            id
            name
         }
         photo
      }
   }
`;

export default GET_CURRENT_USER;
