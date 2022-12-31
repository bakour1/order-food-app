import React, { useState } from 'react';

const ShowCartContext = React.createContext( {
  isShownCart: false,
  showCart: () => { },
  hideCart: () => { },
} );

export const ShowCartProvider = ( props ) => {

  // eslint-disable-next-line react-hooks/rules-of-hooks
  const [ isShownCart, setIsShownCart ] = useState( false );

  const showCartHandler = () => {
    setIsShownCart( true );
  };
  const HideCartHandler = () => {
    setIsShownCart( false );
  };

  return (
    <ShowCartContext.Provider
      value={ {
        isShownCart: isShownCart,
        showCart: showCartHandler,
        hideCart: HideCartHandler,
      } }
    >
      { props.children }
    </ShowCartContext.Provider>
  );
};


export default ShowCartContext;
