import React from 'react';


import NavigationItem from './NavigationItem/NavigationItem';

import cssClasses from './NavigationItems.css';

const navigationItems = (props) => {
    return (
        <ul className={cssClasses.NavigationItems}>
            <NavigationItem link="/">Burger Builder</NavigationItem>
            <NavigationItem link="/orders">Order</NavigationItem>
        </ul>
    );


}

export default navigationItems;