import { gql } from '@apollo/client';

const GET_TEAM_MATCHES = gql`
   query GET_TEAM_MATCHES($teamGid: ID!, $isPlayedFilter: Boolean) {
      teamMatches(teamGid: $teamGid, isPlayedFilter: $isPlayedFilter) {
         id
         homeTeam {
            id
            name
            shortName
         }
         awayTeam {
            id
            name
            shortName
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

export default GET_TEAM_MATCHES;
