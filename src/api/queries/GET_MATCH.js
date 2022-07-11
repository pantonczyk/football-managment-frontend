import { gql } from '@apollo/client';

const GET_MATCH = gql`
   query GET_MATCH($matchGid: ID!) {
      match(matchGid: $matchGid) {
         id
         homeTeam {
            id
            name
            shortName
            playerSet {
               id
               firstName
               lastName
               playerNumber
               extendedName
            }
         }
         awayTeam {
            id
            name
            shortName
            playerSet {
               id
               firstName
               lastName
               playerNumber
               extendedName
            }
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
         matcheventSet {
            id
            minute
            team {
               id
               name
               shortName
            }
            player {
               id
               firstName
               lastName
            }
            typeName {
               id
               name
            }
         }
      }
   }
`;

export default GET_MATCH;
