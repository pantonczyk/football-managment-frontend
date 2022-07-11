import React, { memo } from 'react';
import { oneOf, oneOfType, bool, any, node, string, object, func } from 'prop-types';

import AdapterDateFns from '@mui/lab/AdapterDateFns';
import LocalizationProvider from '@mui/lab/LocalizationProvider';
import DateTimePicker from '@mui/lab/DateTimePicker';
import { createTheme, ThemeProvider } from '@mui/material/styles';

import ThemedTextField from 'components/ThemedTextField';

const ThemedDateTimePicker = ({
   id,
   inputRef,
   name,
   label,
   value,
   onChange,
   inputFormat = 'dd/MM/yyyy HH:mm',
   ampm = false,
   ampmInClock = false,
   allowSameDateSelection = true,
   clearable = false,
   disableMaskedInput = false,
   defaultCalendarMonth,
   mask,
   minDate,
   minTime,
   minDateTime,
   maxDate,
   maxTime,
   maxDateTime,
   showDaysOutsideCurrentMonth = true,
   showToolbar = true,
   showTodayButton = true,
   toolbarTitle = 'Wybierz datę',
   clearText = 'Wyczyść',
   cancelText = 'Anuluj',
   todayText = 'Dzisiaj',
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
   const dateTimePickerTheme = createTheme({
      palette: {
         primary: {
            main: '#3651d4',
         },
      },
   });

   return (
      <LocalizationProvider dateAdapter={AdapterDateFns}>
         <ThemeProvider theme={dateTimePickerTheme}>
            <DateTimePicker
               id={id}
               inputRef={inputRef}
               name={name}
               label={label}
               value={value}
               onChange={onChange}
               inputFormat={inputFormat}
               ampm={ampm}
               ampmInClock={ampmInClock}
               allowSameDateSelection={allowSameDateSelection}
               clearable={clearable}
               disableMaskedInput={disableMaskedInput}
               defaultCalendarMonth={defaultCalendarMonth}
               mask={mask}
               minDate={minDate}
               minTime={minTime}
               minDateTime={minDateTime}
               maxDate={maxDate}
               maxTime={maxTime}
               maxDateTime={maxDateTime}
               showDaysOutsideCurrentMonth={showDaysOutsideCurrentMonth}
               showToolbar={showToolbar}
               showTodayButton={showTodayButton}
               toolbarTitle={toolbarTitle}
               clearText={clearText}
               cancelText={cancelText}
               todayText={todayText}
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

ThemedDateTimePicker.propTypes = {
   id: string,
   inputRef: oneOfType([func, object]),
   name: string,
   label: node,
   value: any,
   onChange: func,
   inputFormat: string,
   ampm: bool,
   ampmInClock: bool,
   allowSameDateSelection: bool,
   clearable: bool,
   disableMaskedInput: bool,
   defaultCalendarMonth: any,
   mask: string,
   minDate: any,
   minTime: any,
   minDateTime: any,
   maxDate: any,
   maxTime: any,
   maxDateTime: any,
   showDaysOutsideCurrentMonth: bool,
   showToolbar: bool,
   showTodayButton: bool,
   toolbarTitle: string,
   clearText: string,
   cancelText: string,
   todayText: string,
   loading: bool,
   variant: oneOf(['standard', 'outlined']),
   error: bool,
   helperText: string,
   required: bool,
   disabled: bool,
   openTo: oneOf(['day', 'mont', 'year']),
   className: oneOfType([string, object]),
};

export default memo(ThemedDateTimePicker);
