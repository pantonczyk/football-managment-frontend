import React, { memo } from 'react';
import { string, oneOfType, arrayOf, node } from 'prop-types';

const StatisticsTab = ({ title, children }) => {
   return <div title={title}>{children}</div>;
};

StatisticsTab.propTypes = {
   title: string,
   children: oneOfType([arrayOf(node), node]),
};

export default memo(StatisticsTab);
