import { gql } from '@apollo/client';

const SET_USER_PHOTO = gql`
   mutation SET_USER_PHOTO($photo: Upload!) {
      setUserPhoto(photo: $photo) {
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

export default SET_USER_PHOTO;
