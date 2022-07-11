import { gql } from '@apollo/client';

const GET_EVENT_TYPES = gql`
   query GET_EVENT_TYPES {
      eventTypes {
         id
         name
      }
   }
`;

export default GET_EVENT_TYPES;
