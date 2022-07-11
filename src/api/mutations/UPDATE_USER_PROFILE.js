import { gql } from '@apollo/client';

const UPDATE_USER_PROFILE = gql`
   mutation UPDATE_USER_PROFILE(
      $firstName: String
      $lastName: String
      $username: String
      $email: String
   ) {
      updateAccount(
         firstName: $firstName
         lastName: $lastName
         username: $username
         email: $email
      ) {
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

export default UPDATE_USER_PROFILE;
