import React from 'react';

import bgLogo from '../../assets/images/burger-logo.png';

import cssClasses from './Logo.css';

const logo = (props) => {
    return (
        <div className={cssClasses.Logo}>
            <img src={bgLogo} alt="Burger Builder" />
        </div>
    );
}

export default logo;