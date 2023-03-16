import React, { useEffect, useState, useContext } from "react";
import { useParams } from "react-router-dom";
import { ProductsContext } from "../App";

function OneProduct() {
  const { id } = useParams();
  const {products} = useContext(ProductsContext);
  const [product, setProduct] = useState();
  let handleAddToCart = ()=>{
    console.log(78);
  }
  useEffect(() => {
    let product = products.find((p) => p.id === +id);
    setProduct(product);
  }, [id, products]);

  return (
    <div className="productCard">
      <div className="oneProductImg">
        <img src={product?.images[3]} alt="" />
      </div>
      <div className="oneProductDetails">
        <span className="pTitle">{product?.title}</span>
        <span className="pDesc">{product?.description}</span>
        <span className="priceDetails">
          <span className="pPrice">Price: ${product?.price}</span>
          <span className="pDiscount">
            Discount: {product?.discountPercentage}%
          </span>
        </span>
        <span className="addItemToCart" onClick={handleAddToCart}>Add to cart</span>
      </div>
    </div>
  );
}

export default OneProduct;