import { gql } from '@apollo/client';

const SET_MATCH_AS_PLAYED = gql`
   mutation SET_MATCH_AS_PLAYED($matchGid: ID!) {
      setMatchAsPlayed(matchGid: $matchGid) {
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

export default SET_MATCH_AS_PLAYED;
