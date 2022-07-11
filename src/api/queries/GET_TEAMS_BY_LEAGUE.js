import { gql } from '@apollo/client';

const GET_TEAMS_BY_LEAGUE = gql`
   query GET_TEAMS_BY_LEAGUE($leagueGid: ID!) {
      teamsByLeague(leagueGid: $leagueGid) {
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
      }
   }
`;

export default GET_TEAMS_BY_LEAGUE;
