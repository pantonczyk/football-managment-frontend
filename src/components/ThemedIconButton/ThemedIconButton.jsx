import React, { memo } from 'react';
import { oneOf, oneOfType, bool, node, string, object, func } from 'prop-types';

import IconButton from '@mui/material/IconButton';

const ThemedIconButton = ({
   id,
   ariaLabel,
   color,
   disabled,
   size,
   sx,
   className,
   children,
   onClick,
   ...props
}) => {
   return (
      <IconButton
         id={id}
         aria-label={ariaLabel}
         color={color}
         disabled={disabled}
         size={size}
         sx={{
            '&.MuiIconButton-colorPrimary': {
               color: '#3f51b5',
            },
         }}
         className={className}
         onClick={onClick}
         {...props}
      >
         {children}
      </IconButton>
   );
};

ThemedIconButton.propTypes = {
   id: string,
   ariaLabel: string,
   color: oneOfType([
      string,
      oneOf(['inherit', 'default', 'primary', 'secondary', 'error', 'info', 'success', 'warning']),
   ]),
   disabled: bool,
   size: oneOf(['small', 'medium', 'large']),
   sx: oneOfType([func, object]),
   className: oneOfType([string, object]),
   onClick: func,
   children: node,
};

export default memo(ThemedIconButton);
