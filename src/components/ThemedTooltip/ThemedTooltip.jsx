import React from 'react';
import { oneOf, oneOfType, bool, node, string, object } from 'prop-types';

import Tooltip from '@mui/material/Tooltip';

const ThemedTooltip = ({
   id,
   title,
   ref,
   placement = 'top',
   arrow = true,
   followCursor = false,
   className,
   children,
   ...props
}) => {
   return (
      <Tooltip
         ref={ref}
         id={id}
         title={title}
         arrow={arrow}
         placement={placement}
         followCursor={followCursor}
         componentsProps={{
            tooltip: { sx: { backgroundColor: '#4c5f7a', fontSize: '14px' } },
            arrow: { sx: { color: '#4c5f7a' } },
         }}
         className={className}
         {...props}
      >
         {children}
      </Tooltip>
   );
};

ThemedTooltip.propTypes = {
   id: string,
   title: string,
   arrow: bool,
   placement: oneOf([
      'bottom-end',
      'bottom-start',
      'bottom',
      'left-end',
      'left-start',
      'left',
      'right-end',
      'right-start',
      'right',
      'top-end',
      'top-start',
      'top',
   ]),
   followCursor: bool,
   className: oneOfType([string, object]),
   children: node,
};

export default ThemedTooltip;
