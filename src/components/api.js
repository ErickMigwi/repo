import React, { createContext, useContext, useEffect, useState } from "react";
import { products } from "../data"

const ApiContext = createContext();

export function ApiProvider({children}) {
  const [productData, setProductData] = useState([]);

  useEffect(() => {
    setProductData(products);
  }, []);

  const api = {
    getProductData: () => productData,
  };

  return <ApiContext.Provider value={api}>{children}</ApiContext.Provider>;
}

export function useApi() {
  return useContext(ApiContext);
}