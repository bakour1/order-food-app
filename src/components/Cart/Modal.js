import React, { Fragment, useContext } from 'react';
import classes from './Modal.module.css';
import ReactDOM from 'react-dom';
import ShowCartContext from '../../store/showCart-context';

const Backdrop = () => {
  const hideCartCtx = useContext( ShowCartContext );

  const hideCartHandler = () => {
    hideCartCtx.hideCart();
  };
  return <div className={ classes.backdrop } onClick={ hideCartHandler } />;
};

const ModalOverlay = ( props ) => {
  return <div className={ classes.modal }>
    <div className={ classes.content }>
      { props.children }
    </div>
  </div>;
};

const portalElement = document.getElementById( 'overlays' );


const Modal = ( props ) => {
  return (
    <Fragment>
      { ReactDOM.createPortal( <Backdrop />, portalElement ) }
      { ReactDOM.createPortal( <ModalOverlay>
        { props.children }
      </ModalOverlay>, portalElement ) }
    </Fragment>
  );
};

export default Modal;
