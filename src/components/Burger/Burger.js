import React from 'react';

import BurgerIngredient from './BurgerIngredient/BurgerIngredient';

import cssClasses from './Burger.css';

const burger = (props) => {

    let ingredients = Object.keys(props.ingredients).map(ingredientKey => {
        return [...Array(props.ingredients[ingredientKey])].map((_,index) => {
            return <BurgerIngredient key={ingredientKey+index} type={ingredientKey}/>
        });
    }).reduce((arr, element) => {
        return arr.concat(element);
    },[]);

    if(ingredients.length === 0) {
        ingredients = <p>Please Start Adding Ingredients</p>
    }

    return (
        <div className={cssClasses.Burger}>
            <BurgerIngredient type="bread-top" />
            {ingredients}
            <BurgerIngredient type="bread-bottom" />
        </div>
    );
}

export default burger;