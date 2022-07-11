import { gql } from '@apollo/client';

const CREATE_STADIUM = gql`
   mutation CREATE_STADIUM($leagueGid: ID!, $name: String!, $address: String!) {
      createStadium(leagueGid: $leagueGid, name: $name, address: $address) {
         stadium {
            id
            name
            address
            league {
               id
               name
            }
         }
      }
   }
`;

export default CREATE_STADIUM;
