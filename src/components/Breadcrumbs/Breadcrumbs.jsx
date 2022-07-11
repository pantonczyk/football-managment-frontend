import React, { memo } from 'react';
import { Link } from 'react-router-dom';

import useBreadcrumbs from './useBreadcrumbs';

import { Breadcrumbs as MuiBreadcrumbs } from '@mui/material';
import NavigateNextIcon from '@mui/icons-material/NavigateNext';

import './Breadcrumbs.scss';

const Breadcrumbs = () => {
   const { breadcrumbs } = useBreadcrumbs();

   return (
      <div className="Breadcrumbs">
         <MuiBreadcrumbs
            aria-label="breadcrumb"
            separator={<NavigateNextIcon fontSize="small" className="Breadcrumbs__separator" />}
         >
            {breadcrumbs.map((crumb) => (
               <Link className="Breadcrumbs__link" key={crumb.url} to={crumb.url}>
                  {crumb.name}
               </Link>
            ))}
         </MuiBreadcrumbs>
      </div>
   );
};

export default memo(Breadcrumbs);
