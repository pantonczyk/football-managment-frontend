import { gql } from '@apollo/client';

const GET_USER = gql`
   query GET_USERE($userGid: ID!) {
      user(userGid: $userGid) {
         user {
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
   }
`;

export default GET_USER;
