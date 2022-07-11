import { gql } from '@apollo/client';

const EVENT_TYPE = gql`
   fragment EventTypeFragment on EventTypeNode {
      id
      name
   }
`;

export default EVENT_TYPE;
