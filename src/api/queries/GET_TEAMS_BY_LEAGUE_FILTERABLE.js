import { gql } from '@apollo/client';

const GET_TEAMS_BY_LEAGUE_FILTERABLE = gql`
   query GET_TEAMS_BY_LEAGUE_FILTERABLE($leagueGid: ID!, $searchPhrase: String) {
      filterableTeamsByLeague(leagueGid: $leagueGid, searchPhrase: $searchPhrase) {
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
         matchesPlayed
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

export default GET_TEAMS_BY_LEAGUE_FILTERABLE;
