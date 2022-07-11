import { makeStyles } from '@mui/styles';
import { alpha } from '@mui/material/styles';

const scrollbarColor = '#3f51b5';

export default makeStyles(() => {
   return {
      classes: {
         scrollbarColor: `${scrollbarColor} transparent`,
         '&::-webkit-scrollbar-track': {
            backgroundColor: 'transparent',
         },
         '&::-webkit-scrollbar-thumb': {
            backgroundColor: alpha(`${scrollbarColor}`, 0.8),
            '&:hover': {
               backgroundColor: `${scrollbarColor}`,
            },
         },
      },
   };
});
