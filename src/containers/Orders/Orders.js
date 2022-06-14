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
        this.props.onFectchOrders();
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
                {order}
            </div>
        );
    }
}

const mapStateToProps = state => {
    return {
        orders: state.order.orders,
        loading: state.order.loading
    };
}

const mapDispatchToProps = dispatch => {
    return  {
        onFectchOrders: () => dispatch(actions.fetchOrders())
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(withErrorHandler(Orders, axios));