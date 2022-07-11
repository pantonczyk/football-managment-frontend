import React, { memo } from 'react';
import { useHistory } from 'react-router-dom';
import { string } from 'prop-types';

import { redirectTo } from 'utils/routerFunctions';
import convertIdToGid from 'utils/convertIdToGid';

import ThemedButton from 'components/ThemedButton';

import './LeagueTeamCard.scss';

const LeagueTeamCard = ({
   leagueGid,
   teamId,
   name,
   shortName,
   representativeFirstName,
   representativeLastName,
}) => {
   const history = useHistory();
   const teamGid = convertIdToGid('TeamNode', teamId);

   return (
      <div className="leagueTeamCard">
         <p className="leagueTeamCard__name">{name}</p>
         <h2 className="leagueTeamCard__shortName">{shortName}</h2>

         <p className="leagueTeamCard__leagueOrganizer">
            Reprezentant:{' '}
            <span>
               {representativeFirstName} {representativeLastName}
            </span>
         </p>

         <ThemedButton
            variant="outlined"
            color="primary"
            className="detailsButton"
            onClick={redirectTo(history, `/league-organizer/leagues/${leagueGid}/teams/${teamGid}`)}
         >
            Przejdź do szczegółów
         </ThemedButton>
      </div>
   );
};

LeagueTeamCard.propTypes = {
   leagueGid: string,
   teamId: string,
   name: string,
   shortName: string,
   representativeFirstName: string,
   representativeLastName: string,
};

export default memo(LeagueTeamCard);
