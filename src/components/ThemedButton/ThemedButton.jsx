import React, { memo } from 'react';
import { oneOf, oneOfType, bool, node, string, object, func } from 'prop-types';

import Button from '@mui/material/Button';

import { styles } from './styles';

const ThemedButton = ({
   variant = 'contained',
   color = 'primary',
   size = 'medium',
   fullWidth = false,
   id,
   name,
   type,
   className,
   disabled,
   onClick,
   children,
   ...props
}) => {
   return (
      <Button
         variant={variant}
         color={color}
         size={size}
         fullWidth={fullWidth}
         id={id}
         name={name}
         sx={styles}
         type={type}
         disabled={disabled}
         className={className}
         onClick={onClick}
         {...props}
      >
         {children}
      </Button>
   );
};

ThemedButton.propTypes = {
   variant: oneOf(['contained', 'outlined']),
   color: oneOf(['primary', 'secondary']),
   size: oneOf(['small', 'medium', 'large']),
   fullWidth: bool,
   id: string,
   name: string,
   type: string,
   className: oneOfType([string, object]),
   disabled: bool,
   onCick: func,
   children: node,
};

export default memo(ThemedButton);
