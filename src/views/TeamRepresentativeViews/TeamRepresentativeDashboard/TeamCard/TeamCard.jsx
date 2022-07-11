import React, { memo, useMemo } from 'react';
import { useHistory } from 'react-router-dom';
import { string } from 'prop-types';

import { redirectTo } from 'utils/routerFunctions';
import convertIdToGid from 'utils/convertIdToGid';

import ThemedButton from 'components/ThemedButton';

import './TeamCard.scss';

const TeamCard = ({ id, name, shortName, leagueName, organizerFirstName, organizerLastName }) => {
   const history = useHistory();
   const teamGid = convertIdToGid('TeamNode', id);

   const organizerName = useMemo(() => {
      if (organizerFirstName && organizerLastName)
         return organizerFirstName + ' ' + organizerLastName;
      else return 'Brak';
   }, [organizerFirstName, organizerLastName]);

   return (
      <div className="teamCard">
         <p className="teamCard__name">{name}</p>
         <h2 className="teamCard__shortName">{shortName}</h2>
         <p className="teamCard__league">
            Liga: <span>{leagueName}</span>
         </p>
         <p className="teamCard__leagueOrganizer">
            Organizator: <span>{organizerName}</span>
         </p>

         <ThemedButton
            variant="outlined"
            color="primary"
            className="detailsButton"
            onClick={redirectTo(history, `/team-representative/teams/${teamGid}/overview`)}
         >
            Przejdź do szczegółów
         </ThemedButton>
      </div>
   );
};

TeamCard.propTypes = {
   id: string,
   name: string,
   shortName: string,
   leagueName: string,
   organizerFirstName: string,
   organierLastName: string,
};

export default memo(TeamCard);
