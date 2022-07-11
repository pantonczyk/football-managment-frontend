import { gql } from '@apollo/client';

const MATCH = gql`
   fragment MatchFragment on MatchNode {
      id
      homeTeam {
         id
         name
      }
      awayTeam {
         id
         name
      }
      league {
         id
         name
      }
      stadium
      date
      round
      judge
      homeGoals
      awayGoals
      isPlayed
   }
`;

export default MATCH;
