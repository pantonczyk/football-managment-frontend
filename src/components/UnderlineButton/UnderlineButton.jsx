import React, { forwardRef, memo } from 'react';
import { bool, node, oneOf, oneOfType, string } from 'prop-types';
import classnames from 'classnames';

import './UnderlineButton.scss';

const UnderlineButton = forwardRef(
   (
      { type = 'button', className = '', children, cursor = true, disabled = false, ...props },
      ref
   ) => {
      const classes = classnames(
         'underlineButton',
         { 'underlineButton--cursor_pointer': cursor, 'underlineButton--disabled': disabled },
         className
      );

      return (
         <>
            {type === 'button' && (
               <button type="button" disabled={disabled} className={classes} ref={ref} {...props}>
                  {children}
               </button>
            )}
            {type === 'link' && (
               <a disabled={disabled} className={classes} ref={ref} {...props}>
                  {children}
               </a>
            )}
         </>
      );
   }
);

UnderlineButton.propTypes = {
   type: oneOf(['button', 'link']),
   className: string,
   children: oneOfType([node, string]),
   disabled: bool,
   cursor: bool,
};

export default memo(UnderlineButton);
