import { gql } from '@apollo/client';

const GET_PLAYERS_BY_TEAM = gql`
   query GET_PLAYERS_BY_TEAM($teamGid: ID!, $searchPhrase: String) {
      playersByTeam(teamGid: $teamGid, searchPhrase: $searchPhrase) {
         id
         firstName
         lastName
         height
         weight
         dateOfBirth
         playerNumber
         goals
         assists
         saves
         redCards
         yellowCards
         team {
            representative {
               username
               email
            }
         }
         photo
         position {
            id
            name
         }
      }
   }
`;

export default GET_PLAYERS_BY_TEAM;
