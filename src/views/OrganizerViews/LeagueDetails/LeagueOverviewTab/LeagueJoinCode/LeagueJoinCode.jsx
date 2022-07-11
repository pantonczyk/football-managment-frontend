import React, { memo } from 'react';
import { string } from 'prop-types';

import copyTextToClipboard from 'utils/copyTextToClipboard';

import ThemedButton from 'components/ThemedButton';

import './LeagueJoinCode.scss';

const LeagueJoinCode = ({ leagueCode }) => {
   return (
      <div className="leagueJoinCode">
         <fieldset className="leagueJoinCode__fieldset">
            <legend className="leagueJoinCode__label">Kod dołączenia do ligi</legend>
            <span className="leagueJoinCode__code">{leagueCode}</span>
         </fieldset>
         <ThemedButton
            type="button"
            color="primary"
            className="leagueJoinCode__button"
            onClick={() => copyTextToClipboard(leagueCode)}
         >
            Skopiuj
         </ThemedButton>
      </div>
   );
};

LeagueJoinCode.propTypes = {
   leagueCode: string,
};

export default memo(LeagueJoinCode);
