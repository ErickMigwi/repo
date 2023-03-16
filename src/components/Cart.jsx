import React, { useContext } from "react";
import { CartContext } from "./ProductsDisplay";

function CartItems() {
  const { cart } = useContext(CartContext);
 console.log(cart);
  return (
    <div>
      {/* {cart.map((item) => (
        <p key={item.id}>{item.title}</p>
      ))} */}
    </div>
  );
}

export default CartItems;