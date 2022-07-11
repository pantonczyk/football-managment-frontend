import { gql } from '@apollo/client';

const GET_LEAGUES_LIST = gql`
   query GET_LEAGUES_LIST($searchPhrase: String, $endedFilter: Boolean) {
      leagues(searchPhrase: $searchPhrase, endedFilter: $endedFilter) {
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
      }
   }
`;

export default GET_LEAGUES_LIST;
