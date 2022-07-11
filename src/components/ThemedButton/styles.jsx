export const styles = {
   '&.MuiButton-root': {
      textTransform: 'none',
   },

   // Styles applied to the root element if variant="contained" and color="primary".
   '&.MuiButton-containedPrimary': {
      backgroundColor: '#3f51b5',
      border: '1.5px solid #3f51b5',
   },

   // Styles applied to the root element if variant="contained" and color="secondary".
   '&.MuiButton-containedSecondary': {
      backgroundColor: '#f50057',
      border: '1.5px solid #f50057',
   },

   // Styles applied to the root element if variant="outlined" and color="secondary".
   '&.MuiButton-outlinedPrimary': {
      border: '1.5px solid #3f51b5',
      color: '#3f51b5',
   },

   // Styles applied to the root element if variant="outlined" and color="secondary".
   '&.MuiButton-outlinedSecondary': {
      border: '1.5px solid #f50057',
      color: '#f50057',
   },

   // State class applied to the root element if disabled={true}.
   '&.MuiButton-contained.Mui-disabled': {
      color: '#f4f4f4',
      backgroundColor: '#35445f',
      border: '1.5px solid #576d94',
   },

   '&.MuiButton-outlined.Mui-disabled': {
      color: '#576d94',
      border: '1.5px solid #576d94',
   },
};
