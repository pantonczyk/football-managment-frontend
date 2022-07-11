import React, { memo } from 'react';
import { oneOf, oneOfType, bool, string, object, func, array } from 'prop-types';

import FormControl from '@mui/material/FormControl';
import Autocomplete from '@mui/material/Autocomplete';
import ThemedTextField from '../ThemedTextField';

const ThemedAutocomplete = ({
   variant = 'standard',
   size = 'medium',
   id,
   name,
   value,
   onChange,
   options,
   getOptionLabel,
   label,
   placeholder,
   helperText,
   disabled,
   error,
   loading,
   wrapperClass,
   ...props
}) => {
   return (
      <FormControl fullWidth className={wrapperClass}>
         <Autocomplete
            id={id}
            name={name}
            onChange={onChange}
            options={options}
            getOptionLabel={getOptionLabel}
            disabled={disabled}
            fullWidth
            openText="Otwórz"
            loadingText="Wczytywanie..."
            clearText="Usuń"
            closeText="Zamknij"
            noOptionsText="Brak opcji"
            loading={loading}
            size={size}
            value={value}
            renderInput={(params) => (
               <ThemedTextField
                  {...params}
                  variant={variant}
                  name={name}
                  label={label}
                  disabled={disabled}
                  error={error}
                  placeholder={placeholder}
                  helperText={helperText}
               />
            )}
            {...props}
         />
      </FormControl>
   );
};

ThemedAutocomplete.propTypes = {
   variant: oneOf(['standard', 'outlined']),
   size: oneOf(['medium', 'small']),
   id: string,
   name: string,
   onChange: func,
   options: array,
   getOptionLabel: func,
   label: string,
   placeholder: string,
   helperText: oneOfType([string, bool]),
   disabled: bool,
   error: bool,
   loading: bool,
   wrapperClass: oneOfType([string, object]),
};

export default memo(ThemedAutocomplete);
