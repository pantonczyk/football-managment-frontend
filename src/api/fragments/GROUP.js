import { gql } from '@apollo/client';

const GROUP = gql`
   fragment GroupFragment on GroupProxyNode {
      id
      name
   }
`;

export default GROUP;
