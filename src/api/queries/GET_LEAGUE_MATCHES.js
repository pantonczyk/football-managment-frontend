import { gql } from '@apollo/client';

const GET_LEAGUE_MATCHES = gql`
   query GET_LEAGUE_MATCHES($leagueGid: ID!, $searchPhrase: String, $isPlayedFilter: Boolean) {
      leagueMatches(
         leagueGid: $leagueGid
         searchPhrase: $searchPhrase
         isPlayedFilter: $isPlayedFilter
      ) {
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

export default GET_LEAGUE_MATCHES;
