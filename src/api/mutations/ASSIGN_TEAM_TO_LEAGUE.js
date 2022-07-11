import { gql } from '@apollo/client';

const ASSIGN_TEAM_TO_LEAGUE = gql`
   mutation ASSIGN_TEAM_TO_LEAGUE($teamGid: ID!, $leagueCode: String!) {
      assignTeamToLeague(teamGid: $teamGid, leagueCode: $leagueCode) {
         team {
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
   }
`;

export default ASSIGN_TEAM_TO_LEAGUE;
