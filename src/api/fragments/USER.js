import { gql } from '@apollo/client';

const USER = gql`
   fragment UserFragment on UserNode {
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
`;

export default USER;
