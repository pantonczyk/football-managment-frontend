import React, { memo, useMemo } from 'react';
import { useHistory } from 'react-router-dom';
import classNames from 'classnames';
import { bool, string, number } from 'prop-types';

import { redirectTo } from 'utils/routerFunctions';
import convertIdToGid from 'utils/convertIdToGid';

import ThemedButton from 'components/ThemedButton';

import './LeagueCard.scss';

const LeagueCard = ({ id, name, shortName, teamsCount, leagueSize, isEnded }) => {
   const history = useHistory();
   const leagueGid = convertIdToGid('LeagueNode', id);

   const leagueStatusClass = classNames(
      'status__info',
      isEnded ? 'status__info--inactive' : 'status__info--active'
   );

   const leagueStatus = useMemo(() => {
      return isEnded ? 'Zakończone' : 'Aktywne';
   }, [isEnded]);

   return (
      <div className="leagueCard">
         <p className="leagueCard__name">{name}</p>

         <h2 className="leagueCard__shortName">{shortName}</h2>

         <p className="leagueCard__status">
            Status rozgrywek: <span className={leagueStatusClass}> {leagueStatus} </span>
         </p>

         <p className="leagueCard__leagueCount">
            Liczba zespołów: {teamsCount}/{leagueSize}
         </p>
         <ThemedButton
            variant="outlined"
            color="primary"
            className="detailsButton"
            onClick={redirectTo(history, `/league-organizer/leagues/${leagueGid}`)}
         >
            Przejdź do szczegółów
         </ThemedButton>
      </div>
   );
};

LeagueCard.propTypes = {
   id: string,
   name: string,
   shortName: string,
   teamsCount: number,
   leagueSize: number,
   isEnded: bool,
};

export default memo(LeagueCard);
