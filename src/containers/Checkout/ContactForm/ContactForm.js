import React, {Component} from 'react';

import Button from '../../../components/UI/Button/Button';

import cssClasses from './ContactForm.css';
import axios from '../../../axios-orders';

class ContactForm extends Component {
    state = {
        name : '',
        email: '',
        address: {
            street: '',
            postalCode: '',
        },
        loading: false,
    }

    orderHandler = (event) => {
        event.preventDefault();
        this.setState({loading: true});
        const order = {
            ingredients: this.props.ingredients,
            // Don't use it in real world because user can manipulate client side
            price: this.props.totalPrice,
            customer: {
                name: 'Ali',
                address: {
                    street: 'Test Street',
                    zipCode: '1212',
                    country: 'Pakistan'
                },
                email: 'test@test.com',
                deliveryMethod: 'fastest'
            }
        }
        axios.post('orders.json', order)
        .then(response => {
            this.setState({loading: false});
        }).catch(error => {
            this.setState({loading: false});
        });
        
    }

    render () {
        return (
            <div className={cssClasses.ContactForm}>
                <h4>Enter Your Contact Data</h4>
                <form>
                    <input className={cssClasses.Input} type="text" name="name" placeholder='Enter Your Name'></input>
                    <input className={cssClasses.Input} type="email" name="email" placeholder='Enter Your Email'></input>
                    <input className={cssClasses.Input} type="text" name="street" placeholder='Enter Your Stree'></input>
                    <input className={cssClasses.Input} type="text" name="postalCode" placeholder='Enter Your Postal Code'></input>
                    <Button btnType="Success" clicked={this.orderHandler}>ORDER</Button>
                </form>
            </div>
        );
    }
}

export default ContactForm;