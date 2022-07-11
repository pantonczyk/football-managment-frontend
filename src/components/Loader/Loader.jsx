import React from 'react';
import { oneOf } from 'prop-types';

import CircularProgress from '@mui/material/CircularProgress';

import './Loader.scss';

const Loader = ({ size = 40 }) => (
   <div className="loader__wrapper">
      <CircularProgress size={size} thickness={4} sx={{ color: '#3651d4' }} />
   </div>
);

Loader.propTypes = {
   size: oneOf([16, 28, 40]),
};

export default Loader;
