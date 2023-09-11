import React, { useState } from "react";
import {
  AiFillHeart,
  AiOutlineHeart,
  AiOutlineMessage,
  AiOutlineShoppingCart,
} from "react-icons/ai";
import { Link } from "react-router-dom";
import { RxCross1 } from "react-icons/rx";
import styles from "../../../../styles/styles";
import { FaShoppingCart } from "react-icons/fa";

const ProductPopUpDetail = ({ setOpen, data }) => {
  const [count, setCount] = useState(1);
  const [click, setClick] = useState(false);

  // display description
  const regex = /\s\•\s/g;
  let descText = data?.long_desc;

  return (
    <div className="bg-[#fff]">
      {data ? (
        <div className="fixed w-full h-screen  top-0 left-0 bg-[#00000030] z-40 flex items-center justify-center">
          <div className="w-[75%] top-[45px] 800px:w-[60%] h-[80vh] 800px:h-[75vh] bg-white rounded-md shadow-sm relative p-4">
            <RxCross1
              size={30}
              className="absolute right-3 top-3 z-50"
              onClick={() => setOpen(false)}
            />
            <div className="grid grid-flow-col relative justify-stretch w-full 800px:flex">
              <div>
                <img
                  src={data.photos[0]}
                  className=" object-contain w-96 h-auto "
                  alt=""
                />
                <div
                  className={`${styles.button} absolute bottom-1.5 bg-[#000] rounded-[4px] h-11`}
                >
                  <span className="text-[#fff] flex items-center">
                    Send Message <AiOutlineMessage className="ml-1" />
                  </span>
                </div>
              </div>

              <div className=" p-5 mt-8 ">
                <div className="text-left ">
                  <div className=" font-semibold mt-4 mb-2 text-xl">
                    {data.name}
                  </div>
                  <div className="text-xl font-extrabold">
                    {new Intl.NumberFormat("en-DE").format(data.price)} VND
                  </div>
                </div>

                <div className=" mt-6 text-left overflow-auto h-72">
                  {descText.replace(regex)}
                </div>
                <Link to={`/product/${data.name}`}>
                  <button className=" bg-gray-800 flex justify-center text-xl text-white  px-2 py-2 ">
                    <FaShoppingCart className="mt-1 mr-2" /> View Detail
                  </button>
                </Link>
              </div>
            </div>
          </div>
        </div>
      ) : null}
    </div>
  );
};

export default ProductPopUpDetail;
