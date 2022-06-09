import React from 'react';

import cssClasses from './Backdrop.css';

const backdrop = (props) => (props.show ? <div className={cssClasses.Backdrop} onClick={props.clicked}></div>:null)
export default backdrop;