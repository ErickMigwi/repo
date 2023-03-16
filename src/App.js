import { createContext, useEffect,useReducer,  useState } from "react";
import { Route, Routes } from "react-router-dom";
import "./App.css";
// import Home from "./components/Home";
import Navbar from "./components/Navbar";
import OneProduct from "./components/OneProduct";
import Products from "./components/Products";
import ProductsDisplay from "./components/ProductsDisplay";
import axios from "axios";
import Cart from "./components/Cart";
import Home from "./components/Home";
import {createStore} from 'redux'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faFacebook, faTwitter, faInstagram } from '@fortawesome/free-brands-svg-icons';
import { faEnvelope, faPhone } from '@fortawesome/free-solid-svg-icons';





// Create a context for the products data
export const ProductsContext = createContext([]);
 function reducer(state =0, action){
    switch(action.type){
      case "increment":
        return  state + 1;
        case 'decrement':
          return state-1
    }
 }
function App() {
  const [getProducts, setProducts] = useState([]);
  const[state, dispatch] = useReducer(reducer)
  async function getProduct() {
    try {
      const response = await axios.get("https://dummyjson.com/products");
      setProducts(response.data.products);
    } catch (error) {
      console.error(error);
    }
  }

  const [categories, setCategories] = useState([]);

  useEffect(() => {
    getProduct();
  }, []);

  useEffect(() => {
    const categories = getProducts.map((p) => p.category);
    const categoriesArr = Array.from(new Set(categories));
    setCategories(categoriesArr);
  }, [getProducts]);
  let handleIncrement = ()=>{
    dispatch({type:'increment'})
  }
  let handleDecrement= ()=>{
    dispatch({type:'decrement'})
  }
 let count = createStore(reducer)
 console.log(count);
  return (
    
    // Provide the products data using the ProductsContext.Provider
    <ProductsContext.Provider value={{products:getProducts, cart:[]}}>
      <div className="App">
        <Navbar />
        <Routes>
          <Route path= {'/'} element={<Home/>}/>
          <Route path={"/products"} element={<Products />}>
            <Route index element={<ProductsDisplay category={"all"} />} />
            {categories.length > 0 &&
              categories.map((c) => {
                return (
                  <Route
                    key={c}
                    path={`${c}`}
                    element={<ProductsDisplay category={`${c}`} />}
                  />
                );
              })}
          </Route>
          <Route path="/products/:id" element={<OneProduct />} />
          <Route path = '/cart' element = {<Cart/>}/>
        </Routes>
        <button onClick={handleIncrement}>Add</button>
        <button onClick={handleDecrement}>sub</button>
        {/* <Erick/> */}
        <p>{state}</p>
      </div>
      <footer className="footer">
      <div className="footer-container">
        <div className="footer-section">
          <h2 className="footer-heading">Contact Us</h2>
          <p className="footer-text"><FontAwesomeIcon icon={faEnvelope} className="footer-icon" />support@example.com</p>
          <p className="footer-text"><FontAwesomeIcon icon={faPhone} className="footer-icon" />555-555-5555</p>
        </div>
        <div className="footer-section">
          <h2 className="footer-heading">Follow Us</h2>
          <div className="footer-social-icons">
            <a href="#"><FontAwesomeIcon icon={faFacebook} /></a>
            <a href="#"><FontAwesomeIcon icon={faTwitter} /></a>
            <a href="#"><FontAwesomeIcon icon={faInstagram} /></a>
          </div>
        </div>
      </div>
      <div className="footer-bottom">
        <p className="footer-text">&copy; 2023 My Store. All rights reserved.</p>
      </div>
    </footer>
    </ProductsContext.Provider>
  );
}

export default App;