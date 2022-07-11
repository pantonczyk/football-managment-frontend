import { gql } from '@apollo/client';

const REGISTER = gql`
   mutation REGISTER(
      $email: String!
      $firstName: String!
      $lastName: String!
      $password: String!
      $passwordConfirm: String!
      $roleGid: ID!
      $username: String!
   ) {
      register(
         email: $email
         firstName: $firstName
         lastName: $lastName
         password: $password
         passwordConfirm: $passwordConfirm
         roleGid: $roleGid
         username: $username
      ) {
         user {
            id
         }
      }
   }
`;

export default REGISTER;
