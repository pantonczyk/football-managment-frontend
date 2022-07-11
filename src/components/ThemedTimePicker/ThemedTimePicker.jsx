import React, { memo } from 'react';
import { oneOf, oneOfType, arrayOf, bool, any, node, string, object, func } from 'prop-types';

import { createTheme, ThemeProvider } from '@mui/material/styles';
import AdapterDateFns from '@mui/lab/AdapterDateFns';
import LocalizationProvider from '@mui/lab/LocalizationProvider';
import TimePicker from '@mui/lab/TimePicker';

import ThemedTextField from 'components/ThemedTextField';

const ThemedTimePicker = ({
   id,
   inputRef,
   name,
   label,
   value,
   onChange,
   openTo = 'hours',
   views = ['hours', 'minutes'],
   inputFormat = 'HH:mm',
   mask = '__:__',
   variant = 'outlined',
   ampm = false,
   ampmInClock = false,
   minTime,
   maxTime,
   loading = false,
   error,
   helperText,
   required,
   disabled,
   showToolbar = true,
   toolbarTitle = 'Wybierz godzinę',
   orientation = 'landscape',
   cancelText = 'Anuluj',
   clearText = 'Wyczyść',
   className,
   ...props
}) => {
   const timePickerTheme = createTheme({
      palette: {
         primary: {
            main: '#3651d4',
         },
      },
   });
   return (
      <LocalizationProvider dateAdapter={AdapterDateFns}>
         <ThemeProvider theme={timePickerTheme}>
            <TimePicker
               id={id}
               inputRef={inputRef}
               name={name}
               label={label}
               value={value}
               onChange={onChange}
               openTo={openTo}
               views={views}
               inputFormat={inputFormat}
               mask={mask}
               ampm={ampm}
               ampmInClock={ampmInClock}
               minTime={minTime}
               maxTime={maxTime}
               loading={loading}
               disabled={disabled}
               showToolbar={showToolbar}
               toolbarTitle={toolbarTitle}
               orientation={orientation}
               cancelText={cancelText}
               clearText={clearText}
               renderInput={(params) => (
                  <ThemedTextField
                     {...params}
                     error={error}
                     helperText={helperText}
                     variant={variant}
                     required={required}
                     className={className}
                  />
               )}
               {...props}
            />
         </ThemeProvider>
      </LocalizationProvider>
   );
};

ThemedTimePicker.propTypes = {
   id: string,
   inputRef: oneOfType([func, object]),
   name: string,
   label: node,
   value: any,
   onChange: func,
   openTo: oneOf(['hours', 'minutes', 'seconds']),
   views: arrayOf(oneOf(['hours', 'minutes', 'seconds'])),
   inputFormat: string,
   mask: string,
   variant: oneOf(['standard', 'outlined']),
   ampm: bool,
   ampmInClock: bool,
   minTime: any,
   maxTime: any,
   loading: bool,
   error: bool,
   helperText: string,
   required: bool,
   disabled: bool,
   showToolbar: bool,
   toolbarTitle: string,
   orientation: oneOf(['landscape', 'portrait']),
   cancelText: string,
   cleartext: string,
   className: oneOfType([string, object]),
};

export default memo(ThemedTimePicker);
