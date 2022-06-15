import React from 'react';

import BuildControl from './BuildControl/BuildControl';

import cssClasses from './BuildControls.css';

const controls = [
    {label: 'Salad', type:'salad'},
    {label: 'Bacon', type:'bacon'},
    {label: 'Cheese', type:'cheese'},
    {label: 'Meat', type:'meat'}
];

const buildControls = (props) => {
    return ( 
        <div className={cssClasses.BuildControls}>
            <p>Current Price: <strong>{props.price.toFixed(2)} $</strong></p>
            {controls.map(control => (
                <BuildControl 
                    key={control.label} 
                    ingredientName={control.label}
                    // type = {control.type} 
                    // added={props.ingredientAdded}
                    added={() => props.ingredientAdded(control.type)}
                    removed={()=> props.ingredientRemove(control.type)}
                    disabled={props.disabled[control.type]}/>
            ))}
            <button className={cssClasses.OrderButton} 
            disabled={!props.purchasable} onClick={props.order}>{props.isAuthenticated?"ORDER YOUR BURGER":"SIGN UP TO ORDER"}</button>
        </div>
    );
}

export default buildControls;