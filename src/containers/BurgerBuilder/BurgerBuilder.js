import React, {Component} from 'react';
import {connect} from 'react-redux';
import * as burgerBuilderActions from '../../store/actions/index';

import Auxilary from '../../hoc/Auxiliary/Auxiliary';
import Burger from '../../components/Burger/Burger';
import BuildControls from '../../components/Burger/BuildControls/BuildControls';
import Modal from  '../../components/UI/Modal/Modal';
import OrderSummary from '../../components/Burger/OrderSummary/OrderSummary';

import axios from '../../axios-orders';
import Spinner from '../../components/UI/Spinner/Spinner';

import withErrorHandler from '../../hoc/WithErrorHandler/WithErrorHandler';


class BurgerBuilder extends Component {

    constructor(props) {
        super(props);
        this.state = {
            purchasing: false,
        };
    }

    componentDidMount() {
       this.props.onInitIngredients();
    }

    updatePurchase(ingredients) {
        const ingredient = {
            ...ingredients
        };
        const sum = Object.keys(ingredient).map(key => {
            return ingredient[key];
        }).reduce((sum, element) => {
            return sum+element;
        },0);
        return sum>0;
    }

    purchaseHandler = () => {
        if(this.props.isAuthenticated) {
            this.setState({purchasing: true});
        } else {
            this.props.onSetAuthRedirectPath('/checkout');
            this.props.history.push("/auth");
        }
        

    }
    
    purchaseCancelHandler = () => {
        this.setState({purchasing: false});
    }

    purchaseContinueHandler = () => {
        this.props.onPurchaseInit();
        this.props.history.push("/checkout");
    }


    render() {
        const disabledInfo = {
             ...this.props.ings
        }
        for(let key in disabledInfo) {
             disabledInfo[key] = disabledInfo[key] <= 0;
        }
        let orderSummary = null;
        let burger = this.props.error?<p>Ingredinets can't be loaded</p> : <Spinner />;
        if(this.props.ings) {
            burger = (
                <Auxilary>
                    <Burger ingredients={this.props.ings}/>
                    <BuildControls 
                        ingredientAdded={this.props.onIngredientAdded}
                        ingredientRemove={this.props.onIngredientRemoved}
                        disabled={disabledInfo} price={this.props.price}
                        purchasable={this.updatePurchase(this.props.ings)} 
                        order={this.purchaseHandler}
                        isAuthenticated={this.props.isAuthenticated}/>
                </Auxilary>
                );
                orderSummary = <OrderSummary ingredients={this.props.ings} 
                price = {this.props.price} 
                purchaseCanceled={this.purchaseCancelHandler}
                purchaseContinue={this.purchaseContinueHandler}/>
        }
         
        return (
            <Auxilary>
                <Modal show={this.state.purchasing} modelClosed={this.purchaseCancelHandler}>
                    {orderSummary}
                </Modal>
                {burger}
            </Auxilary>
        );
    }
}

const mapStateToProps = state => {
    return {
        ings: state.burgerBuilder.ingredients,
        price: state.burgerBuilder.totalPrice,
        error: state.burgerBuilder.error,
        isAuthenticated: state.auth.token !== null
    };
};
const mapDispatchToProps = dispatch => {
    return {
        onIngredientAdded: (igName) => dispatch(burgerBuilderActions.addIngredient(igName)),
        onIngredientRemoved: (igName) => dispatch(burgerBuilderActions.removeIngredient(igName)),
        onInitIngredients: () => dispatch(burgerBuilderActions.initIngredients()),
        onPurchaseInit: () => dispatch(burgerBuilderActions.purchaseInit()),
        onSetAuthRedirectPath:  (path) => dispatch(burgerBuilderActions.setAuthenticationRedirectPath(path))
    };
} 

export default connect(mapStateToProps, mapDispatchToProps)(withErrorHandler(BurgerBuilder, axios));