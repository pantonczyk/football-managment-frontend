import { gql } from '@apollo/client';

const REMOVE_PHOTO_CURRENT_USER = gql`
   mutation REMOVE_PHOTO_CURRENT_USER {
      removeUserPhoto {
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

export default REMOVE_PHOTO_CURRENT_USER;
