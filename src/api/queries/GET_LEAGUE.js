import { gql } from '@apollo/client';

const GET_LEAGUE = gql`
   query GET_LEAGUE($leagueGid: ID!) {
      league(leagueGid: $leagueGid) {
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
            username
            firstName
            lastName
         }
         matchSet {
            id
         }
      }
   }
`;

export default GET_LEAGUE;
