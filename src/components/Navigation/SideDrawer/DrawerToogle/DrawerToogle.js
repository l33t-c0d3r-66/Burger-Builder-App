import React from 'react';

import cssClasses from './DrawerToogle.css';
const drawerToogle = (props) => {
    
    return (
        <div onClick={props.click} className={cssClasses.DrawerToggle}>
            <div></div>
            <div></div>
            <div></div>
        </div>
    );
}

export default drawerToogle;