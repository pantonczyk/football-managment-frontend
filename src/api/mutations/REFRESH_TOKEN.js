import { gql } from '@apollo/client';

const REFRESH_TOKEN = gql`
   mutation REFRESH_TOKEN($refreshToken: String!) {
      refreshToken(refreshToken: $refreshToken) {
         token
         refreshToken
         payload
         success
         errors
      }
   }
`;

export default REFRESH_TOKEN;
