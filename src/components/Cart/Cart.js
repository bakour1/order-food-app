import React, { useContext, useState } from 'react';
import CartContext from '../../store/cart-context';
import ShowCartContext from '../../store/showCart-context';
import classes from './Cart.module.css';
import CartItem from './CartItem';
import Checkout from './Checkout';
import Modal from './Modal';

const Cart = () => {

  const cartCtx = useContext( CartContext );
  const showCartCtx = useContext( ShowCartContext );
  const [ isCheckout, setIsCheckout ] = useState( false );

  const totalAmount = `$${ cartCtx.totalAmount.toFixed( 2 ) }`;
  const hasItems = cartCtx.items.length > 0;

  const cartItemRemoveHandler = ( id ) => {
    cartCtx.removeItem( id );
  };

  const cartItemAddHandler = ( item ) => {
    cartCtx.addItem( { ...item, amount: 1 } );
  };

  const cartItems = (
    <ul className={ classes[ 'cart-items' ] }>
      { cartCtx.items.map( ( item ) => (
        <CartItem
          key={ item.id }
          name={ item.name }
          amount={ item.amount }
          price={ item.price }
          onRemove={ cartItemRemoveHandler.bind( null, item.id ) }
          onAdd={ cartItemAddHandler.bind( null, item ) }
        />
      ) ) }
    </ul>
  );


  const hideCartHandler = () => {
    showCartCtx.hideCart();
  };

  const checkoutHandler = () => {
    setIsCheckout( true );
  };

  const submitOrderHandler = async ( userData ) => {
    const dataSend = await ( fetch( 'https://react-movies-38d33-default-rtdb.firebaseio.com/orders.json', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify( {
        user: userData,
        orderedItems: cartCtx.items,
      } ),
    } ) );
    const dataResponse = await dataSend.json();

    console.log( dataResponse );
  };

  return (
    <Modal>
      { cartItems }
      <div className={ classes.total }>
        <span>Total Amount</span>
        <span>{ totalAmount }</span>
      </div>
      { isCheckout && <Checkout onConfirm={ submitOrderHandler }
        onCancel={ hideCartHandler }
      /> }
      { !isCheckout && <div className={ classes.actions }>
        <button className={ classes[ 'button--alt' ] } onClick={ hideCartHandler }>
          Close
        </button>
        { hasItems && <button className={ classes.button } onClick={ checkoutHandler }>
          Order
        </button> }
      </div> }
    </Modal>
  );
};

export default Cart;
