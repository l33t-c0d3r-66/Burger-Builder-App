import React, { Component } from 'react';
import {Route, withRouter, Redirect} from 'react-router-dom';
import {connect} from 'react-redux';

import CheckoutSummary from '../../components/Order/CheckoutSummary/CheckoutSummary';
import ContactForm from './ContactForm/ContactForm';
class CheckOut extends Component{

    checkoutCancelledHandler = () => {
        this.props.history.goBack();
    }

    checkoutContinuedHandler = () => {
        this.props.history.replace('/checkout/contact-data');
    }
    render() {
        let summary = <Redirect to="/" />
        if(this.props.ings) {
            const purchasedRedirect = this.props.purchased? <Redirect to="/" />:null;
            summary = 
            <div>
                <CheckoutSummary ingredients={this.props.ings}
                    checkoutCancelled={this.checkoutCancelledHandler} 
                    checkoutContinued={this.checkoutContinuedHandler}/>
                <Route 
                    component={ContactForm}
                path={this.props.match.path+'/contact-data'} />
            </div>
        }
        return summary;
    }
}


const mapStateToProps = state => {
    return {
        ings: state.burgerBuilder.ingredients,
        purchased: state.order.purchased
    }
};

export default connect(mapStateToProps)(withRouter(CheckOut));