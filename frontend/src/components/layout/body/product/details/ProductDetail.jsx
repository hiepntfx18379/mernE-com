import React, { useEffect, useState } from "react";
import { IoCaretBackSharp, IoCaretForwardSharp } from "react-icons/io5";

import ImageDetail from "./ImageDetail";
import RelatedProduct from "./RelatedProduct";
import { useDispatch, useSelector } from "react-redux";
import { userSelector } from "../../../../../tookit/selector";
import { useNavigate } from "react-router-dom";
import orderSlice from "../../../../../tookit/orders/orderSlice";

const ProductDetail = ({ data, list }) => {
  const [numberProduct, setNumberProduct] = useState(1);
  const user = useSelector(userSelector);
  const navigate = useNavigate();
  const [changeStock, setChange] = useState(data.stock - 1);

  useEffect(() => {}, []);

  // change image
  const imageArray = [0, 1, 2, 3];
  const [imageDefault, setImage] = useState(0);
  const changeImage = (id) => {
    setImage(imageArray[id]);
  };

  // handle de-in crement quality
  const handleDecrement = () => {
    if (numberProduct === 1) {
      setNumberProduct(1);
    } else {
      setNumberProduct(numberProduct - 1);
      setChange(changeStock + 1);
    }
  };
  const handleIncrement = () => {
    setNumberProduct(numberProduct + 1);
    setChange(changeStock - 1);
  };

  // display description
  const regex = /\s\•\s/g;
  let descText = data?.long_desc;

  const productCart = {
    ...data,
    quantity: numberProduct,
  };

  const dispatch = useDispatch();

  const handleClickAddCart = () => {
    if (!user) {
      navigate("/login");
    } else {
      //add product to cart db
      dispatch(orderSlice.actions.orderDataProducts(productCart));
      navigate("/cart");
    }
  };

  return (
    <div className="container">
      <div className="grid grid-cols-2">
        <div className="flex relative justify-between items-center">
          <div className=" flex flex-col absolute left-0 gap-5 z-10">
            {imageArray.map((img, id) => {
              return (
                <ImageDetail
                  data={data}
                  id={id}
                  key={id}
                  img={img}
                  ClickChangeImg={changeImage}
                />
              );
            })}
          </div>
          <img
            src={data.photos[imageDefault]}
            className="h-[400px] absolute right-0"
            alt=""
          />
        </div>

        <div className="ml-5">
          <div className=" titleDetail ">{data.name}</div>
          <div className="py-5 text-3xl text-gray-400">
            {new Intl.NumberFormat("en-DE").format(data.price)} VND
          </div>
          <div className=" leading-relaxed  text-gray-400">
            {data.short_desc}
          </div>
          <div className="my-5 ">
            <span className="uppercase text-xl font-semibold ">
              Danh mục: {data.category}
            </span>
            <span className="ml-3 text-xl font-semibold">
              Kho: {changeStock < 0 ? 0 : changeStock}
            </span>
          </div>
          <div className=" border-2 text-gray-400 w-fit">
            <div className=" flex">
              <span className="py-1 pl-5 pr-10 uppercase mt-[2px]">
                Quantity
              </span>
              <span className="flex justify-between text-black py-1 pr-5">
                {numberProduct === 1 ? (
                  <button style={{ opacity: 0.5 }}>
                    <IoCaretBackSharp />
                  </button>
                ) : (
                  <button style={{ opacity: 1 }} onClick={handleDecrement}>
                    <IoCaretBackSharp />
                  </button>
                )}

                <span className="px-2 box-border text-sm mt-1">
                  {numberProduct}
                </span>

                {numberProduct >= data.stock ? (
                  <button style={{ opacity: 0.5 }}>
                    <IoCaretForwardSharp />
                  </button>
                ) : (
                  <button style={{ opacity: 1 }} onClick={handleIncrement}>
                    <IoCaretForwardSharp />
                  </button>
                )}
              </span>

              <button
                style={{ opacity: 1 }}
                className="px-5 bg-gray-800 py-1"
                onClick={handleClickAddCart}
              >
                {numberProduct < data.stock ? "Add to Cart" : "Sold out"}
              </button>
            </div>
          </div>
        </div>
      </div>

      <div className="mt-20">
        <span className=" uppercase font-bold text-xl ">
          Product Description
        </span>
        <div className="my-[20px] whitespace-pre-line">
          {descText.replace(regex, "\n- ")}
        </div>
      </div>

      <div className=" my-[30px]">
        <span className=" uppercase font-bold text-xl ">Related Products</span>
        <div className="flex gap-7 mt-[20px]">
          {list.length > 0
            ? list.map((product, id) => {
                return (
                  <div className="w-[200px] h-[300px] text-center">
                    <RelatedProduct key={id} pro={product} id={id} />
                  </div>
                );
              })
            : null}
        </div>
      </div>
    </div>
  );
};

export default ProductDetail;
