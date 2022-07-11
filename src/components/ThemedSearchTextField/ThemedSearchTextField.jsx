import React, { memo } from 'react';

import InputAdornment from '@mui/material/InputAdornment';
import SearchOutlinedIcon from '@mui/icons-material/SearchOutlined';

import ThemedTextField from 'components/ThemedTextField';

const ThemedSearchTextField = (props) => {
   return (
      <ThemedTextField
         InputProps={{
            startAdornment: (
               <InputAdornment position="start">
                  <SearchOutlinedIcon />
               </InputAdornment>
            ),
         }}
         {...props}
      />
   );
};

export default memo(ThemedSearchTextField);
