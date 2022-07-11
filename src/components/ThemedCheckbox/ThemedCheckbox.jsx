import React, { memo } from 'react';
import { oneOf, oneOfType, string, object, bool, func } from 'prop-types';

import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';

const styles = {
   '&.MuiFormControlLabel-root': {
      color: '#040718',
   },

   '& .MuiCheckbox-root ': {
      color: '#3f51b5',
   },
   '& .MuiCheckbox-root.Mui-checked ': {
      color: '#3f51b5',
   },
};

const ThemedCheckbox = ({
   checkboxID,
   name = '',
   label = '',
   checked = false,
   disabled = false,
   checkedColor = 'primary',
   onChange,
   required,
   checkboxSize = 'small',
   value,
   className,
}) => (
   <FormControlLabel
      control={
         <Checkbox
            id={checkboxID}
            name={name}
            checked={checked}
            color={checkedColor}
            required={required}
            size={checkboxSize}
            value={value}
            onChange={onChange}
         />
      }
      disabled={disabled}
      label={label}
      sx={styles}
      className={className}
   />
);

ThemedCheckbox.propTypes = {
   checkboxID: string,
   name: string,
   label: string,
   checked: bool,
   disabled: bool,
   checkedColor: oneOf(['primary', 'secondary', 'error', 'info', 'success', 'warning']),
   onChange: func,
   required: bool,
   checkboxSize: oneOf(['medium', 'small']),
   value: string,
   className: oneOfType([string, object]),
};

export default memo(ThemedCheckbox);
