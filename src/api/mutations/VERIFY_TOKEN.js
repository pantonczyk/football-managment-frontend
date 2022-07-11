import { gql } from '@apollo/client';

const VERIFY_TOKEN = gql`
   mutation VERIFY_TOKEN($token: String!) {
      verifyToken(token: $token) {
         payload
         success
         errors
      }
   }
`;

export default VERIFY_TOKEN;
