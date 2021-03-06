import React from 'react';

import Logo from '../../Logo/Logo';
import NavigationItems from '../NavigationItems/NavigationItems';
import Backdrop from '../../UI/Backdrop/Backdrop';
import Auxiliary from '../../../hoc/Auxiliary/Auxiliary'

import cssClasses from './SideDrawer.css';
const sideDrawer = (props) => {
    let attachClasses = [cssClasses.SideDrawer, cssClasses.Close];
    if(props.open) {
        attachClasses = [cssClasses.SideDrawer, cssClasses.Open]
    }
    return (
        <Auxiliary>
            <Backdrop show={props.open} clicked={props.closed}/>
            <div className={attachClasses.join(" ")} onClick={props.closed}>
                <div className={cssClasses.Logo}>
                    <Logo />
                </div>
                <nav>
                    <NavigationItems isAuthenticated = {props.isAuth}/>
                </nav>
            </div>
        </Auxiliary>
    );
}

export default sideDrawer;