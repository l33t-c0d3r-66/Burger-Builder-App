import React, { Component } from 'react';
import {Route, withRouter} from 'react-router-dom';

import CheckoutSummary from '../../components/Order/CheckoutSummary/CheckoutSummary';
import ContactForm from './ContactForm/ContactForm';

class CheckOut extends Component{

    state = {
        ingredients : null,
        totalPrice: 0,
    }

    componentWillMount() {
        console.log(this.props);
        const query = new URLSearchParams(this.props.location.search);
        const ingredients = {};
        let price = 0;
        for(let param of query.entries()) {
            if(param[0]==="price"){
                price = param[1];
            } else {
                ingredients[param[0]] = +param[1];
            }
        }
        this.setState({ingredients: ingredients, totalPrice: price});
    }

    checkoutCancelledHandler = () => {
        this.props.history.goBack();
    }

    checkoutContinuedHandler = () => {
        this.props.history.replace('/checkout/contact-data');
    }
    render() {
        return (
            <div>
                <CheckoutSummary ingredients={this.state.ingredients}
                    checkoutCancelled={this.checkoutCancelledHandler} 
                    checkoutContinued={this.checkoutContinuedHandler}/>
                <Route 
                    component={ () => <ContactForm ingredients={this.state.ingredients} price={this.state.totalPrice}/>}
                    path={this.props.match.path+'/contact-data'} />
            </div>
        );
    }
}

export default withRouter(CheckOut);