import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";
import { BrowserRouter } from "react-router-dom";
import { ProductsContext } from "./context";
import {getProducts} from './data'

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <ProductsContext.Provider value={getProducts} >
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </ProductsContext.Provider>
);
