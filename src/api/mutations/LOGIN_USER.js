import { gql } from '@apollo/client';

const LOGIN_USER = gql`
   mutation LOGIN_USER($email: String!, $password: String!) {
      tokenAuth(email: $email, password: $password) {
         success
         errors
         token
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

export default LOGIN_USER;
