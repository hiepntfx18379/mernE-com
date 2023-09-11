import React, { useEffect, useState } from "react";
import styles from "../../../../styles/styles";
import ProductItem from "./ProductItem";
import { useParams } from "react-router-dom";
import axios from "axios";

const AllProduct = () => {
  const [data, setProduct] = useState([]);
  const { category } = useParams();

  useEffect(() => {
    async function getDataProduct() {
      const res = await axios.get("/product/");

      if (category === "All") {
        setProduct(res.data);
      } else {
        const list = res.data.filter((x) => x.category === category);
        setProduct(list);
      }
    }

    getDataProduct();
  }, [category]);

  return (
    <div className={`${styles.section_f}`}>
      <div className={`${styles.heading}`}>
        <h1 style={{ paddingLeft: "15px" }}>All Products</h1>
      </div>
      <div className=" w-full text-center text-sm grid grid-cols-4 ">
        {data.length !== 0 && (
          <>
            {data.map((info, index) => (
              <ProductItem pro={info} key={index} />
            ))}
          </>
        )}
      </div>
    </div>
  );
};

export default AllProduct;
