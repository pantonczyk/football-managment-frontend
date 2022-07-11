import { gql } from '@apollo/client';

const UPDATE_MATCH = gql`
   mutation UPDATE_MATCH($matchGid: ID!, $date: DateTime, $judge: String, $stadium: String) {
      updateMatch(matchGid: $matchGid, date: $date, judge: $judge, stadium: $stadium) {
         match {
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
   }
`;

export default UPDATE_MATCH;
