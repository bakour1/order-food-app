import { useContext } from "react";
import Cart from "./components/Cart/Cart";
import Header from "./components/Layout/Header";
import Meals from "./components/Meals/Meals";
import { CartProvider } from "./store/cart-context";
import ShowCartContext from "./store/showCart-context";

function App () {
  const ctx = useContext( ShowCartContext );

  return (
    <CartProvider>
      { ctx.isShownCart && <Cart /> }
      <Header />
      <main>
        <Meals />
      </main>
    </CartProvider>
  );
}

export default App;
