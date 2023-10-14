import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import ProductDetail from "../components/layout/body/product/details/ProductDetail";

const ProductDetailIsPage = () => {
  const [pro, setPro] = useState("");
  const [relatedList, setRelatedList] = useState([]);
  const { name } = useParams();

  useEffect(() => {
    async function getDataProduct() {
      const res = await axios(
        "https://ecomserver-9b4w.onrender.com/api/product",
      );
      const getPro = res.data.find((x) => x.name === name);
      const list = res.data.filter(
        (x) => x.category === getPro.category && x.name !== name,
      );

      setPro(getPro);
      setRelatedList(list);

      window.scrollTo({ top: 100, behavior: "smooth" });
    }

    getDataProduct();
  }, [name]);

  return (
    <div>{pro ? <ProductDetail data={pro} list={relatedList} /> : null}</div>
  );
};

export default ProductDetailIsPage;
