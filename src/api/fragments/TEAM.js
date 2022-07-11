import { gql } from '@apollo/client';

const TEAM = gql`
   fragment TeamFragment on TeamNode {
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
      matchesPlayed
   }
`;

export default TEAM;
