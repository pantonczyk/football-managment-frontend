import React, { memo, useState } from 'react';
import { number, oneOfType, arrayOf, node, string } from 'prop-types';

import './StatisticsTabsPanel.scss';

const StatisticsTabsPanel = ({ title = 'Statystyki', selected, children }) => {
   const [selectedItem, setSelectedItem] = useState(selected || 0);

   const setState = (tabID) => () => {
      setSelectedItem(tabID);
   };

   return (
      <div className="statisticsTabsPanel">
         <div className="statisticsTabsPanel__header">
            <h1>{title}</h1>

            <nav className="statisticsTabsPanel__nav">
               {children?.map((tab, index) => (
                  <div
                     className={`nav__item ${index === selectedItem && 'nav__item--active'}`}
                     key={index}
                     onClick={setState(index)}
                  >
                     {tab.props.title}
                  </div>
               ))}
            </nav>
         </div>
         <main className="statisticsTabsPanel__tab">{children[selectedItem]}</main>
      </div>
   );
};

StatisticsTabsPanel.propTypes = {
   title: string,
   selected: number,
   children: oneOfType([arrayOf(node), node]),
};

export default memo(StatisticsTabsPanel);
