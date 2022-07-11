import { gql } from '@apollo/client';

const GET_TEAM = gql`
   query GET_TEAM($teamGid: ID!) {
      team(teamGid: $teamGid) {
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

export default GET_TEAM;
