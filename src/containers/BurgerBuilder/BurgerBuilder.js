import React, {Component} from 'react';

import Auxilary from '../../hoc/Auxiliary/Auxiliary';
import Burger from '../../components/Burger/Burger';
import BuildControls from '../../components/Burger/BuildControls/BuildControls';
import Modal from  '../../components/UI/Modal/Modal';
import OrderSummary from '../../components/Burger/OrderSummary/OrderSummary';

import axios from '../../axios-orders';
import Spinner from '../../components/UI/Spinner/Spinner';

import withErrorHandler from '../../hoc/WithErrorHandler/WithErrorHandler';

const INGREDIENT_PRICES = {
    cheese: 0.5,
    salad: 0.4,
    meat: 1.3,
    bacon: 0.7
};

class BurgerBuilder extends Component {

    constructor(props) {
        super(props);
        this.state = {
            ingredients: null,
            totalPrice: 4,
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

    addIngredientHandler = (type) => {
        const oldCount = this.state.ingredients[type];
        const updatedCount = oldCount + 1;
        const updatedIngredients = {
            ...this.state.ingredients
        }
        updatedIngredients[type] = updatedCount;
        const priceAddition = INGREDIENT_PRICES[type];
        const oldPrice = this.state.totalPrice;
        const newPrice = oldPrice + priceAddition;
        
        this.setState({totalPrice: newPrice, ingredients: updatedIngredients});
        this.updatePurchase(updatedIngredients);
    };

    removeIngredientHandler = (type) => {
        const oldCount = this.state.ingredients[type];
        if(oldCount<=0) {
            return;
        }
        const updatedCount = oldCount - 1;
        const updatedIngredients = {
            ...this.state.ingredients
        }
        updatedIngredients[type] = updatedCount;
        const priceDeduction = INGREDIENT_PRICES[type];
        const oldPrice = this.state.totalPrice;
        const newPrice = oldPrice - priceDeduction;
        
        this.setState({totalPrice: newPrice, ingredients: updatedIngredients});
        this.updatePurchase(updatedIngredients);
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
        queryParams.push('price='+this.state.totalPrice);
        const queryString = queryParams.join('&');

        this.props.history.push({
            pathname: '/checkout',
            search: '?'+ queryString,
        });

    }


    render() {
        const disabledInfo = {
             ...this.state.ingredients
        }
        for(let key in disabledInfo) {
             disabledInfo[key] = disabledInfo[key] <= 0;
        }
        let orderSummary = null;
         let burger = this.state.error?<p>Ingredinets can't be loaded</p> : <Spinner />;
        if(this.state.ingredients) {
            burger = (
                <Auxilary>
                    <Burger ingredients={this.state.ingredients}/>
                    <BuildControls 
                        ingredientAdded={this.addIngredientHandler}
                        ingredientRemove={this.removeIngredientHandler}
                        disabled={disabledInfo} price={this.state.totalPrice}
                        purchasable={this.state.purchasable} order={this.purchaseHandler}/>
                </Auxilary>
                );
                orderSummary = <OrderSummary ingredients={this.state.ingredients} 
                price = {this.state.totalPrice} 
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

export default withErrorHandler(BurgerBuilder, axios);