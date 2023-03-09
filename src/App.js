import { createContext, useEffect, useState } from "react";
import { Route, Routes } from "react-router-dom";
import "./App.css";
import Home from "./components/Home";
import Navbar from "./components/Navbar";
import OneProduct from "./components/OneProduct";
import Products from "./components/Products";
import ProductsDisplay from "./components/ProductsDisplay";
import axios from "axios";

// Create a context for the products data
export const ProductsContext = createContext([]);

function App() {
  const [getProducts, setProducts] = useState([]);

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

  return (
    // Provide the products data using the ProductsContext.Provider
    <ProductsContext.Provider value={getProducts}>
      <div className="App">
        <Navbar />
        <Routes>
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
        </Routes>
      </div>
    </ProductsContext.Provider>
  );
}

export default App;