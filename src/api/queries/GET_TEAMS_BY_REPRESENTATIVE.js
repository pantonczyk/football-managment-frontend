import { gql } from '@apollo/client';

const GET_TEAMS_BY_REPRESENTATIVE = gql`
   query GET_TEAMS_BY_REPRESENTATIVE($searchPhrase: String) {
      teamsByRepresentative(searchPhrase: $searchPhrase) {
         id
         name
         shortName
         won
         draw
         lost
         goalsScored
         goalsLost
         goalsDiff
         points
         position
         league {
            id
            name
            shortName
            description
            leagueSize
            teamsCount
            isSplit
            splitOneStartDate
            splitTwoStartDate
            isEnded
            organizer {
               id
               firstName
               lastName
               email
            }
         }
         representative {
            id
            username
            firstName
            lastName
            email
         }
      }
   }
`;

export default GET_TEAMS_BY_REPRESENTATIVE;
