import React, { memo } from 'react';
import { bool, func } from 'prop-types';

import Modal from '@mui/material/Modal';
import CloseRoundedIcon from '@mui/icons-material/CloseRounded';

import ThemedButton from 'components/ThemedButton';
import ThemedIconButton from 'components/ThemedIconButton';
import ThemedTooltip from 'components/ThemedTooltip';

import './ModalSetMatchAsPlayed.scss';

const ModalSetMatchAsPlayed = ({ open, handleClose, setMatchAsPlayed }) => {
   return (
      <Modal open={open} onClose={handleClose} keepMounted>
         <div className="setMatchAsPlayedModal">
            <div className="setMatchAsPlayedModal__header">
               <h1>Zakończ mecz</h1>

               <ThemedIconButton
                  ariaLabel="Zamknij"
                  size="medium"
                  color="primary"
                  onClick={handleClose}
               >
                  <ThemedTooltip title="Zamknij">
                     <CloseRoundedIcon fontSize="medium" />
                  </ThemedTooltip>
               </ThemedIconButton>
            </div>

            <div className="setMatchAsPlayedModal__content">
               <p>
                  Uwaga! Po zakończeniu meczu nie będzie można edytować jego szczegółów, a także
                  dodawać zdarzeń.
               </p>
            </div>

            <div className="setMatchAsPlayedModal__options">
               <ThemedButton variant="outlined" color="primary" onClick={handleClose}>
                  Anuluj
               </ThemedButton>

               <ThemedButton variant="contained" color="secondary" onClick={setMatchAsPlayed}>
                  Zakończ mecz
               </ThemedButton>
            </div>
         </div>
      </Modal>
   );
};

ModalSetMatchAsPlayed.propTypes = {
   open: bool,
   handleClose: func,
   setMatchAsPlayed: func,
};

export default memo(ModalSetMatchAsPlayed);
