import React, { memo } from 'react';
import { oneOf, oneOfType, bool, string, number, object, func, array } from 'prop-types';
import shortid from 'shortid';

import { FormControl, FormHelperText, InputLabel, MenuItem, Select } from '@mui/material';

import { styles } from './styles';

const ThemedSelect = ({
   variant = 'standard',
   size,
   id,
   labelID,
   label,
   name,
   value,
   onChange,
   menuItemsList,
   propsToMapValue,
   propsToMapName,
   helperText,
   disabled,
   error,
   wrapperClass,
   ...props
}) => {
   return (
      <FormControl fullWidth className={wrapperClass}>
         <InputLabel
            id={labelID}
            variant={variant}
            size={size}
            sx={styles.label}
            disabled={disabled}
            error={error}
         >
            {label}
         </InputLabel>
         <Select
            id={id}
            labelId={labelID}
            label={label}
            name={name}
            value={value}
            onChange={onChange}
            variant={variant}
            size={size}
            sx={styles.select}
            disabled={disabled}
            error={error}
            MenuProps={{
               anchorOrigin: {
                  vertical: 'bottom',
                  horizontal: 'left',
               },
               transformOrigin: {
                  vertical: 'top',
                  horizontal: 'left',
               },
            }}
            {...props}
         >
            {menuItemsList ? (
               menuItemsList?.map((option) => (
                  <MenuItem key={shortid()} value={option[propsToMapValue]}>
                     {option[propsToMapName]}
                  </MenuItem>
               ))
            ) : (
               <MenuItem value="">
                  <em>Brak</em>
               </MenuItem>
            )}
         </Select>
         <FormHelperText variant={variant} error={error} sx={styles.helperText}>
            {helperText}
         </FormHelperText>
      </FormControl>
   );
};

ThemedSelect.propTypes = {
   variant: oneOf(['standard', 'outlined']),
   id: string,
   labelID: string,
   label: string,
   name: string,
   value: oneOfType([string, number]),
   onChange: func,
   menuItemsList: array,
   propsToMapValue: string,
   propsToMapName: string,
   helperText: oneOfType([string, bool]),
   disabled: bool,
   error: bool,
   wrapperClass: oneOfType([string, object]),
};

export default memo(ThemedSelect);
