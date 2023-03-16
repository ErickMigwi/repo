import React, { useContext, createContext, useEffect, useReducer, useState } from "react";
import { useNavigate, Route, Routes } from "react-router-dom";
import { ProductsContext } from "../App";


import Cart from "./Cart";
export const CartContext = createContext(90)

function reducer(state, action){


  switch(action.type){
  
  case 'AddToCart':
    const cartedItems= action.products.find((item)=> item.id===action.payLoad)
    console.log(state.cart);
    return{
          ...state,
          cart: [...state.cart, cartedItems]
          
    } 
    
    
}
}
function ProductsDisplay({ category }) {
 
  const [state, dispatch] =useReducer(reducer, {cart:[]})
  const  {products}  = useContext(ProductsContext);
  let [cart, setCart] = useState([])
  const navigate = useNavigate();
  const [data, setData] = useState(products);
  // const [cart, setCart] = useState([])

  const handleNavigation = (id) => {
    navigate(`/products/${id}`);
  };
  let handleAddToCart = (id)=>{
   dispatch({type:'AddToCart', payLoad: id, products})
  }
//  console.log({state.cart});
  useEffect(() => {
    if (category === "all") {
      setData(products);
    } else {
      console.log(category);
      const itemsInCategory = products.filter((p) => p.category === category);
      setData(itemsInCategory);
    }
  }, [products, category]);
  useEffect(()=>{
    setCart(state.cart)
    console.log(cart);
    
  }, [state.cart])
 
  return (
    <CartContext.Provider value={{cart:state.cart}}>
      
    <div className="productsContainer">
      {data && data.length > 0 ? (
        data.map((product) => {
          return (
            <div className="product" key={product.id}>
              <div
                className="pImg"
                onClick={() => handleNavigation(product.id)}
              >
                <img src={product?.images[0]} alt="product " />
              </div>
              <div className="pDetails">
                <span>{product.title}</span>
                <span className="price">Price: ${product.price}</span>
              </div>
              <div  className="addtoCart" onClick={()=>handleAddToCart(product.id)}>Add to Cart</div>
          
            </div>
          );
        })
      ) : (
        <div>
          <h2>There are no products</h2>
        </div>
      )}
   {/* {state.cart && state.cart.length>0 ?(
    state.cart.map((item)=>{
     return <p>{item.title}</p>
    })
   ):(
    <p>No items available</p>
   )} */}
   <Routes>
  <Route path = '/cart' element = {<Cart/>}/>
  </Routes>
    </div>
    </CartContext.Provider>
  );
}

export default ProductsDisplay;
