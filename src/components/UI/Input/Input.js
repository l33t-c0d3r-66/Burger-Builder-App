import React from 'react';

import cssClasses from './Input.css';

const input = (props) => {
    let inputElement = null;
    switch(props.elementType) {
        case ('input'):
            inputElement = <input className={cssClasses.InputElement} 
                            {...props.elementConfig} 
                            value={props.value} 
                            onChange={props.changed}/>;
        break;
        case ('textarea'):
            inputElement = <textarea className={cssClasses.InputElement} 
                            {...props.elementConfig} 
                            value={props.value}
                            onChange={props.changed}/>;
        break;
        case ('select'):
            inputElement = <select className={cssClasses.InputElement} 
                            value={props.value}>
                                {props.elementConfig.options.map(option => (
                                  <option key={option.value} value={option.value}>
                                      {option.displayValue}
                                  </option>  
                                ))}
                            </select>;
        break;    
        default:
            inputElement = <input className={cssClasses.InputElement} 
                            {...props.elementConfig} 
                            value={props.value}
                            onChange={props.changed}/>;
    }
    return (
        <div className={cssClasses.Input}>
            <label className={cssClasses.Label}>{props.label}</label>
            {inputElement}
        </div>
    );
}

export default input;