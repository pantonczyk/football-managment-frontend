import React, { memo } from 'react';
import { func, node, oneOf, string } from 'prop-types';
import classnames from 'classnames';

import useStyles from './useStyles';

import './ThemedScrollDiv.scss';

const ThemedScrollDiv = ({
  children,
  orientation = 'vertical',
  className = '',
  isInvisible = false,
  onScroll = () => {},
  ...props
}) => {
  const styles = useStyles({ orientation });

  const classes = classnames(
    styles.classes,
    `ThemedScrollDiv--${orientation}`,
    {
      'ThemedScrollDiv--invisible': isInvisible,
    },
    className
  );

  return (
    <div className={classes} onScroll={onScroll} {...props}>
      {children}
    </div>
  );
};

ThemedScrollDiv.propTypes = {
  children: node,
  className: string,
  onScroll: func,
  orientation: oneOf(['vertical', 'horizontal', 'bidirectional']),
};

export default memo(ThemedScrollDiv);
