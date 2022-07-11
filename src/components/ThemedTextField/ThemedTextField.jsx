import React, { memo } from 'react';
import { oneOf, oneOfType, bool, any, node, string, object, number } from 'prop-types';

import TextField from '@mui/material/TextField';

import { styles } from './styles.jsx';

const ThemedTextField = ({
   variant = 'standard',
   id,
   name,
   label,
   type = 'text',
   placeholder,
   defaultValue,
   helperText,
   required,
   disabled,
   className,
   multiline,
   rows,
   ...props
}) => {
   return (
      <TextField
         variant={variant}
         id={id}
         name={name}
         label={label}
         type={type}
         placeholder={placeholder}
         defaultValue={defaultValue}
         required={required}
         disabled={disabled}
         helperText={helperText}
         fullWidth
         sx={styles}
         className={className}
         multiline={multiline}
         rows={rows}
         {...props}
      />
   );
};

ThemedTextField.propTypes = {
   variant: oneOf(['standard', 'outlined']),
   id: string,
   name: string,
   label: node,
   type: string,
   placeholder: string,
   defaultValue: any,
   helperText: node,
   required: bool,
   disabled: bool,
   className: oneOfType([string, object]),
   multiline: bool,
   rows: number,
};

export default memo(ThemedTextField);
