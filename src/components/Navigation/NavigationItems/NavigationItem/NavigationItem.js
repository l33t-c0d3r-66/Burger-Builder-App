import React from 'react';
import {NavLink} from 'react-router-dom';

import cssClasses from './NavigationItem.css';

const navigationItem = (props) => {
    return (
        <li className={cssClasses.NavigationItem}>
            <NavLink exact to={props.link} activeClassName={cssClasses.active}>{props.children}</NavLink>
        </li>
    );
}

export default navigationItem;