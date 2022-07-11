import React, { memo } from 'react';
import { oneOf, oneOfType, bool, any, node, string, object, func } from 'prop-types';

import AdapterDateFns from '@mui/lab/AdapterDateFns';
import LocalizationProvider from '@mui/lab/LocalizationProvider';
import DatePicker from '@mui/lab/DatePicker';
import { createTheme, ThemeProvider } from '@mui/material/styles';

import ThemedTextField from 'components/ThemedTextField';

const ThemedDatePicker = ({
   id,
   inputRef,
   name,
   label,
   value,
   onChange,
   inputFormat = 'dd/MM/yyyy',
   allowSameDateSelection = true,
   clearable = false,
   disableMaskedInput = false,
   defaultCalendarMonth,
   mask,
   minDate,
   maxDate,
   showTodayButton,
   todayText = 'Dzisiaj',
   orientation = 'landscape',
   showToolbar = true,
   toolbarTitle = 'Wybierz datę',
   loading = false,
   variant = 'outlined',
   error,
   helperText,
   required,
   disabled,
   openTo,
   className,
   ...props
}) => {
   const datePickerTheme = createTheme({
      components: {
         MuiPickersDay: {
            styleOverrides: {
               root: {
                  '&.Mui-selected': {
                     backgroundColor: '#3651d4 !important',
                  },
               },
            },
         },
      },
   });

   return (
      <LocalizationProvider dateAdapter={AdapterDateFns}>
         <ThemeProvider theme={datePickerTheme}>
            <DatePicker
               id={id}
               inputRef={inputRef}
               name={name}
               label={label}
               value={value}
               onChange={onChange}
               inputFormat={inputFormat}
               allowSameDateSelection={allowSameDateSelection}
               clearable={clearable}
               disableMaskedInput={disableMaskedInput}
               defaultCalendarMonth={defaultCalendarMonth}
               mask={mask}
               minDate={minDate}
               maxDate={maxDate}
               showTodayButton={showTodayButton}
               todayText={todayText}
               orientation={orientation}
               showToolbar={showToolbar}
               toolbarTitle={toolbarTitle}
               loading={loading}
               disabled={disabled}
               openTo={openTo}
               renderInput={(params) => (
                  <ThemedTextField
                     {...params}
                     variant={variant}
                     error={error}
                     helperText={helperText}
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

ThemedDatePicker.propTypes = {
   id: string,
   inputRef: oneOfType([func, object]),
   name: string,
   label: node,
   value: any,
   onChange: func,
   inputFormat: string,
   allowSameDateSelection: bool,
   clearable: bool,
   defaultCalendarMonth: any,
   mask: string,
   minDate: any,
   maxDate: any,
   showTodayButton: bool,
   todayText: string,
   orientation: oneOf(['landscape', 'portrait']),
   showToolbar: bool,
   toolbarTitle: string,
   loading: bool,
   variant: oneOf(['standard', 'outlined']),
   error: bool,
   helperText: string,
   required: bool,
   disabled: bool,
   openTo: oneOf(['day', 'mont', 'year']),
   className: oneOfType([string, object]),
};

export default memo(ThemedDatePicker);
