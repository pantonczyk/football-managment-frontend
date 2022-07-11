import { gql } from '@apollo/client';

const REMOVE_MATCH_EVENT = gql`
   mutation REMOVE_MATCH_EVENT($matchEventGid: ID!) {
      removeMatchEvent(matchEventGid: $matchEventGid) {
         removed
      }
   }
`;

export default REMOVE_MATCH_EVENT;
