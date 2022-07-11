import { gql } from '@apollo/client';

const RESET_PASSWORD = gql`
   mutation RESET_PASSWORD($password: String!, $confirmedPassword: String!) {
      resetPassword(password: $password, confirmedPassword: $confirmedPassword) {
         success
      }
   }
`;

export default RESET_PASSWORD;
