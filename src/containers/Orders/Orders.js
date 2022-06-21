import React, {Component} from 'react';
import {connect} from 'react-redux';

import * as actions from '../../store/actions/index';
import Order from '../../components/Order/Order';
import Spinner from '../../components/UI/Spinner/Spinner';

import axios from '../../axios-orders';
import withErrorHandler from '../../hoc/WithErrorHandler/WithErrorHandler';


class Orders extends Component {
    state = {
        orders : [],
        loading: true,
    }
    componentDidMount() {
        this.props.onFectchOrders(this.props.token, this.props.userId);
    }


    render() {
        let order = <Spinner />
        if(!this.props.loading) {
            order = this.props.orders.map(order => (
                <Order key={order.id} ingredients={order.ingredients} price={order.price}/>
            ))
        }
        return (
            <div>
                {!this.props.loading?<h2 style={{textAlign: 'center'}}>My Orders</h2>:null}
                {order}
            </div>
        );
    }
}

const mapStateToProps = state => {
    return {
        orders: state.order.orders,
        loading: state.order.loading,
        token: state.auth.token,
        userId: state.auth.userId
    };
}

const mapDispatchToProps = dispatch => {
    return  {
        onFectchOrders: (token, userId) => dispatch(actions.fetchOrders(token, userId))
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(withErrorHandler(Orders, axios));