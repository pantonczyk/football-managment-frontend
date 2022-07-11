import { gql } from '@apollo/client';

const LEAGUE = gql`
   fragment LeagueFragment on LeagueNode {
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
         email
      }
   }
`;

export default LEAGUE;
