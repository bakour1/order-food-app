import React, { useContext, useEffect, useState } from 'react';
import classes from './HeaderCartButton.module.css';
import CartIcon from '../Cart/CartIcon';
import ShowCartContext from '../../store/showCart-context';
import CartContext from '../../store/cart-context';

const HeaderCartButton = () => {
  const [ isAdded, setIsAdded ] = useState( false );

  const showCartCtx = useContext( ShowCartContext );
  const cartCtx = useContext( CartContext );

  const numberOfCartItems = cartCtx.items.reduce( ( curNumber, item ) => {
    return curNumber + item.amount;
  }, 0 );

  const toggleShowCart = () => {
    showCartCtx.showCart();
  };

  const btnClasses = `${ classes.button } ${ isAdded ? classes.bump : '' }`;

  useEffect( () => {
    if ( cartCtx.items.length === 0 ) {
      return;
    }
    setIsAdded( true );

    const timer = setTimeout( () => {
      setIsAdded( false );
    }, 300 );
    return () => {
      clearTimeout( timer );
    };
  }, [ cartCtx ] );

  return (
    <button className={ btnClasses } onClick={ toggleShowCart }>
      <span className={ classes.icon }>
        <CartIcon />
      </span>
      <span>You Cart</span>
      <span className={ classes.badge }>{ numberOfCartItems }</span>
    </button>
  );
};

export default HeaderCartButton;
