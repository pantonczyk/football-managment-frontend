import React, { memo } from 'react';
import { string, func } from 'prop-types';

import useToggleVisibility from 'hooks/useToggleVisibility';

import { InputAdornment, IconButton } from '@mui/material';
import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';

import ThemedTextField from 'components/ThemedTextField';

const ThemedPasswordField = ({ value, handleChange, autoComplete = 'off', ...props }) => {
   const [isPasswordVisible, handleClickShowPassword] = useToggleVisibility(false);

   const handleMouseDownPassword = (event) => {
      event.preventDefault();
   };

   return (
      <ThemedTextField
         variant="outlined"
         type={isPasswordVisible ? 'text' : 'password'}
         value={value}
         onChange={handleChange}
         autoComplete={autoComplete}
         InputProps={{
            endAdornment: (
               <InputAdornment position="end">
                  <IconButton
                     aria-label="toggle password visibility"
                     onClick={handleClickShowPassword}
                     onMouseDown={handleMouseDownPassword}
                     edge="end"
                  >
                     {isPasswordVisible ? <VisibilityOff /> : <Visibility />}
                  </IconButton>
               </InputAdornment>
            ),
         }}
         {...props}
      />
   );
};

ThemedPasswordField.propTypes = {
   value: string,
   handleChange: func,
};

export default memo(ThemedPasswordField);
