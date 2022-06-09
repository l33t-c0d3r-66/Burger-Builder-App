import React from 'react';

import NavigationItems from '../NavigationItems/NavigationItems';
import DrawerToogle from '../SideDrawer/DrawerToogle/DrawerToogle';

import Logo from '../../Logo/Logo';

import cssClasses from './Toolbar.css';

const toolbar = (props) => {
    return (
       <header className={cssClasses.Toolbar}>
           <DrawerToogle click={props.click} />
           <div className={cssClasses.Logo}>
                <Logo />
           </div>
           <nav className={cssClasses.DesktopOnly}>
               <NavigationItems />
           </nav>
       </header> 
    );
}

export default toolbar;