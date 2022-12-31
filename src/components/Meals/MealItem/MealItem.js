import React, { useContext } from 'react';
import CartContext from '../../../store/cart-context';
import classes from './MealItem.module.css';
import MealItemForm from './MealItemForm';

const MealItem = ( props ) => {
  const cartCtx = useContext( CartContext );

  const price = `$${ props.price.toFixed( 2 ) }`;

  const addToCartHandler = amount => {
    cartCtx.addItem( {
      id: props.id,
      name: props.id,
      amount: amount,
      price: props.price
    } );
  };

  return (
    <li className={ classes.meal }>
      <div>
        <h3>{ props.name }</h3>
        <p className={ classes.description }>{ props.desc }</p>
        <span className={ classes.price }>{ price }</span>
      </div>
      <MealItemForm id={ props.id } onAddToCart={ addToCartHandler } />
    </li>
  );
};

export default MealItem;
