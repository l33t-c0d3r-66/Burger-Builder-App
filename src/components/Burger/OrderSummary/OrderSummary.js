import React from 'react';

import Auxiliary from '../../../hoc/Auxiliary/Auxiliary';
import Button from '../../UI/Button/Button';

const orderSummary = (props) => {
    const ingredientSummary = Object.keys(props.ingredients).map(key => {
        return <li key={key}>
                <span style={{textTransform: 'capitalize'}}>{key}</span> : {props.ingredients[key]}
            </li>
    });
    return (
        <Auxiliary>
            <h2 style={{textAlign: 'center'}}>Your Order</h2>
            <p style={{textAlign: 'center'}}>A delicious Meal with following ingredients</p>
            <ul style={{listStyle: 'none', marginLeft: '75px'}}>
                {ingredientSummary}
            </ul>
            <p style={{textAlign:'center'}}><strong>Total Price is:  {props.price.toFixed(2)}</strong></p>
            <p style={{textAlign: 'center'}}>Checkout to Continue</p>
            <Button clicked={props.purchaseContinue} btnType="Success">CHECKOUT</Button>
            <Button clicked={props.purchaseCanceled} btnType="Danger">CANCEL</Button>
        </Auxiliary>
    );
}

export default orderSummary;