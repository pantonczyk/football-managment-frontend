export const styles = {
   label: {
      '&.Mui-focused': {
         color: '#3f51b5',
      },
      '&.Mui-error': {
         color: '#ff073a',
      },
      '&.MuiFormLabel-filled ': {
         color: '#3f51b5',
         background: 'reed',
         '&.Mui-error': {
            color: '#ff073a',
         },
      },
   },
   select: {
      // Variant underline
      '&.MuiInput-underline:before': {
         borderBottom: '1px solid #3f51b5',
      },
      '&:hover .MuiInput-underline:before': {
         borderBottom: '2px solid #2967da',
      },
      '&.MuiInput-underline:after': {
         borderBottom: '1px solid #3f51b5',
      },
      '&.MuiInput-underline.Mui-disabled:before': {
         borderBottom: '1px solid #999999',
      },
      '&.MuiInput-underline.Mui-error:after, &.MuiInput-underline.Mui-error:before ': {
         borderBottom: '1px solid #ff073a',
      },

      // Variant outlined
      '& .MuiOutlinedInput-notchedOutline': {
         border: '1px solid #3f51b5 ',
      },
      '&:hover .MuiOutlinedInput-notchedOutline ': {
         border: '2px solid #2967da',
      },
      '&.Mui-focused .MuiOutlinedInput-notchedOutline ': {
         border: '2px solid #3f51b5',
      },
      '&.MuiOutlinedInput-notchedOutline.Mui-disabled': {
         borderColor: '#999999',
      },

      '&:hover.Mui-disabled .MuiOutlinedInput-notchedOutline': {
         borderColor: '#999999',
      },
      '&.Mui-error .MuiOutlinedInput-notchedOutline ': {
         borderColor: '#ff073a',
      },
   },
   helperText: {
      '&.MuiFormHelperText-root': {
         color: '#040718',
      },
      '&.MuiFormHelperText-root.Mui-error': {
         color: '#ff073a',
      },
   },
};
