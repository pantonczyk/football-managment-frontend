export const styles = {
   '& input': {
      color: '#040718',
   },

   '& label.Mui-focused': {
      color: '#3f51b5',
      fontWeight: '500',
   },
   '& .MuiFormLabel-filled ': {
      color: '#3f51b5',
      fontWeight: '500',
      '&.Mui-error': {
         color: '#ff073a',
      },
   },
   '& .MuiFormLabel-asterisk ': {
      paddingLeft: '5px',
      color: '#ff073a',
      '&.Mui-error': {
         color: '#ff073a',
      },
   },
   // Label disabled
   '& label.Mui-disabled ': {
      color: '#999999',
   },
   // Label error
   '& label.Mui-error ': {
      color: '#ff073a',
   },

   // Helper Text
   '& .MuiFormHelperText-root': {
      color: '#040718',
   },
   '& .MuiFormHelperText-root.Mui-error': {
      color: '#ff073a',
   },

   // TextField variant standard/underline
   '& .MuiInput-underline:before': {
      borderBottom: '1px solid #3f51b5',
   },
   '&:hover .MuiInput-underline:before ': {
      borderBottom: '2px solid #2967da !important',
   },
   '& .MuiInput-underline:after': {
      borderBottomColor: '#3f51b5',
   },
   // TextField variant standard/underline disabled
   '& .MuiInput-underline.Mui-disabled:before': {
      borderBottom: '1px solid #999999',
   },
   // TextField variant standard/underline error
   '& .MuiInput-underline.Mui-error:after, .MuiInput-underline.Mui-error:before ': {
      borderBottom: '1px solid #ff073a',
   },

   // TextField variant outlined
   '& .MuiOutlinedInput-root .MuiOutlinedInput-notchedOutline': {
      border: '1px solid #3f51b5',
   },
   '&:hover .MuiOutlinedInput-root .MuiOutlinedInput-notchedOutline': {
      border: '2px solid #2967da',
   },
   '& .MuiOutlinedInput-root.Mui-focused .MuiOutlinedInput-notchedOutline': {
      borderColor: '#3f51b5',
   },
   // TextField variant outlined disabled
   '& .MuiOutlinedInput-root.Mui-disabled  .MuiOutlinedInput-notchedOutline ': {
      borderColor: '#999999',
   },
   // TextField variant outlined error
   '& .MuiOutlinedInput-root.Mui-error  .MuiOutlinedInput-notchedOutline ': {
      borderColor: '#ff073a',
   },
};
