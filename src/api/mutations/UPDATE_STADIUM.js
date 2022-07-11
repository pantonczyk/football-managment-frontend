import { gql } from '@apollo/client';

const UPDATE_STADIUM = gql`
   mutation UPDATE_STADIUM($name: String, $address: String, $leagueGid: ID!) {
      updateStadium(name: $name, address: $address, leagueGid: $leagueGid) {
         id
         name
         adress
         league {
            id
            name
         }
      }
   }
`;

export default UPDATE_STADIUM;
