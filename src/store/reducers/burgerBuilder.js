 import * as actionTypes from '../actions/actionTypes';
 import {updateObject} from '../utility';

 const INGREDIENT_PRICES = {
    cheese: 0.5,
    salad: 0.4,
    meat: 1.3,
    bacon: 0.7
};

 const initialState = {
    ingredients: null,
    totalPrice: 4,
    error: false,
    building: false
 }

const addIngredient = (state, action) => {
    const updtIng = {[action.ingredientName]: state.ingredients[action.ingredientName] + 1}
    const updtIngs = updateObject(state.ingredients, updtIng);
    const updtState = {
        ingredients: updtIngs,
        totalPrice: state.totalPrice + INGREDIENT_PRICES[action.ingredientName], 
        building: true
    };
    return updateObject(state, updtState);
};

const removeIngredient = (state, action) => {
    return updateObject(state, {
        ingredients: {
            ...state.ingredients,
            [action.ingredientName]: state.ingredients[action.ingredientName] - 1
        },
        totalPrice: state.totalPrice - INGREDIENT_PRICES[action.ingredientName],
        building: true
    });
};

const setIngredients = (state, action) => {
    return updateObject(state, {
        ingredients: {
            salad: action.ingredients.salad,
            bacon: action.ingredients.bacon,
            cheese: action.ingredients.cheese,
            meat: action.ingredients.meat
        },
        error: false,
        totalPrice: 4,
        building: false
    }); 
};

const reducer = (state = initialState, action) => {
    switch(action.type) {
        case actionTypes.ADD_INGREDIENT:
            return addIngredient(state, action);
        case actionTypes.REMOVE_INGREDIENT:
            return removeIngredient(state, action);
        case actionTypes.SET_INGREDIENTS:
            return setIngredients(state, action);
        case actionTypes.FETCH_INGREDIENTS_FAILED:
            return updateObject(state, {error: true});
        default:
            return state;
    }
}

export default reducer;