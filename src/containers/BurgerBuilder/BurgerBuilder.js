import React, {Component} from 'react';
import {connect} from 'react-redux';
import * as actionTypes from '../../store/actions';

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
            purchasable: false,
            purchasing: false,
            loading: false, 
            error: false
        };
    }

    componentDidMount() {
        console.log(this.props);
        // axios.get("https://burger-app-js-918ef-default-rtdb.firebaseio.com/ingredients.json")
        // .then(response => {
        //     this.setState({ingredients: response.data});
        // }).catch(error => {
        //     this.setState({error: true});
        // });
    }

    updatePurchase = (ingredients) => {
        const ingredient = {
            ...ingredients
        };
        const sum = Object.keys(ingredient).map(key => {
            return ingredient[key];
        }).reduce((sum, element) => {
            return sum+element;
        },0);

        this.setState({purchasable: sum>0});
    }

    purchaseHandler = () => {
        this.setState({purchasing: true});

    }
    
    purchaseCancelHandler = () => {
        this.setState({purchasing: false});
    }

    purchaseContinueHandler = () => {
        const queryParams = [];
        for(let i in this.state.ingredients) {
            queryParams.push(encodeURIComponent(i)+ '=' + encodeURIComponent(this.state.ingredients[i]));
        }
        queryParams.push('price='+this.props.price);
        const queryString = queryParams.join('&');

        this.props.history.push({
            pathname: '/checkout',
            search: '?'+ queryString,
        });

    }


    render() {
        const disabledInfo = {
             ...this.props.ings
        }
        for(let key in disabledInfo) {
             disabledInfo[key] = disabledInfo[key] <= 0;
        }
        let orderSummary = null;
         let burger = this.state.error?<p>Ingredinets can't be loaded</p> : <Spinner />;
        if(this.props.ings) {
            burger = (
                <Auxilary>
                    <Burger ingredients={this.props.ings}/>
                    <BuildControls 
                        ingredientAdded={this.props.onIngredientAdded}
                        ingredientRemove={this.props.onIngredientRemoved}
                        disabled={disabledInfo} price={this.props.price}
                        purchasable={this.state.purchasable} order={this.purchaseHandler}/>
                </Auxilary>
                );
                orderSummary = <OrderSummary ingredients={this.props.ings} 
                price = {this.props.price} 
                purchaseCanceled={this.purchaseCancelHandler}
                purchaseContinue={this.purchaseContinueHandler}/>
                if(this.state.loading) {
                    orderSummary = <Spinner />
                }
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
        ings: state.ingredients,
        price: state.totalPrice
    };
};
const mapDispatchToProps = dispatch => {
    return {
        onIngredientAdded: (igName) => dispatch({type: actionTypes.ADD_INGREDIENT, ingredientName: igName }),
        onIngredientRemoved: (igName) => dispatch({type: actionTypes.REMOVE_INGREDIENT, ingredientName: igName})
    };
} 

export default connect(mapStateToProps, mapDispatchToProps)(withErrorHandler(BurgerBuilder, axios));