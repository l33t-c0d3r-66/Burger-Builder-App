import React from 'react';


import NavigationItem from './NavigationItem/NavigationItem';

import cssClasses from './NavigationItems.css';

const navigationItems = (props) => {
    return (
        <ul className={cssClasses.NavigationItems}>
            <NavigationItem link="/">Burger Builder</NavigationItem>
            {props.isAuthenticated?<NavigationItem link="/orders">Order</NavigationItem>:null}
            {
                props.isAuthenticated
                ?<NavigationItem link="/logout">Logout</NavigationItem>
                :<NavigationItem link="/auth">Authenticate</NavigationItem>

            }
                
        </ul>
    );


}

export default navigationItems;