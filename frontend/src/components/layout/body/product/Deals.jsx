import React, { useEffect, useState } from "react";
import ProductItem from "./ProductItem";
import axios from "axios";
import { useDispatch } from "react-redux";
import productSlice from "../../../../tookit/products/productsSlice";

const Deals = () => {
  const [product, setProduct] = useState([]);
  const dispatch = useDispatch();

  useEffect(() => {
    async function getDataProduct() {
      const res = await axios.get("/product/");
      setProduct(res.data);
      dispatch(productSlice.actions.listDataProducts(res.data));
    }

    getDataProduct();
  }, []);

  return (
    <div className="container ">
      <div className=" uppercase mb-5">
        <div className=" text-second-title">made the hard way</div>
        <div className="text-main-title">top trending products</div>
      </div>
      <div className=" text-center text-sm grid grid-cols-4 gap-4">
        {product.map((pro, id) => (
          <div key={id}>
            <ProductItem pro={pro} />
          </div>
        ))}
      </div>
    </div>
  );
};

export default Deals;
