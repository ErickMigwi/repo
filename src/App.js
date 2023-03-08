import React, { useEffect, useState } from "react";
import { Route, Routes } from "react-router-dom";
import "./App.css";
import Home from "./components/Home";
import Navbar from "./components/Navbar";
import OneProduct from "./components/OneProduct";
import Products from "./components/Products";
import ProductsDisplay from "./components/ProductsDisplay";
import { ApiProvider, useApi } from "./components/api";

function App() {
  const [categories, setCategories] = useState([]);
  const api = useApi();

  useEffect(() => {
    const categories = api.getProductData().map((p) => p.category);
    const categoriesArr = Array.from(new Set(categories));
    setCategories(categoriesArr);
  }, [api]);

  return (
    <div className="App">
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/products" element={<Products products={api.getProductData()} />}>
          <Route path="." element={<ProductsDisplay products={api.getProductData()} category={"all"} />} />
          {categories.length > 0 && categories.map((c) => (
            <Route key={c} path={c} element={<ProductsDisplay category={c} />} />
          ))}
          <Route path=":id" element={<OneProduct products={api.getProductData()} />} />
        </Route>
      </Routes>
    </div>
  );
}

export default function AppWrapper() {
  return (
    <ApiProvider>
      {/* <Navbar/> */}
      <App />
      
      <Products/>
      <ProductsDisplay/>
      {/* <OneProduct/> */}
    </ApiProvider>
  );
}