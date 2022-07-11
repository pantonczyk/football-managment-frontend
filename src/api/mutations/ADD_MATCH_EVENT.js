import { gql } from '@apollo/client';

const ADD_MATCH_EVENT = gql`
   mutation ADD_MATCH_EVENT(
      $eventTypeGid: ID!
      $matchGid: ID!
      $minute: Int!
      $playerGid: ID!
      $teamGid: ID!
   ) {
      addMatchEvent(
         eventTypeGid: $eventTypeGid
         matchGid: $matchGid
         minute: $minute
         playerGid: $playerGid
         teamGid: $teamGid
      ) {
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

export default ADD_MATCH_EVENT;
