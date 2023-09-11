import React, { useState } from "react";
import { BsCartPlus } from "react-icons/bs";
import { RxCross1 } from "react-icons/rx";

const WishListItem = ({ data }) => {
  const [value, setValue] = useState(1);
  const totalPrice = data.discount_price * value;

  return (
    <div className="border-b p-4">
      <div className="w-full 800px:flex items-center">
        <RxCross1 className="cursor-pointer 800px:mb-['unset'] 800px:ml-['unset'] mb-2 ml-2" />
        <img
          src={`${data?.image_Url[0]?.url}`}
          alt=""
          className="w-[130px] h-min ml-2 mr-2 rounded-[5px]"
        />

        <div className="pl-[5px]">
          <h1>{data.name}</h1>
          <h4 className="font-[600] pt-3 800px:pt-[3px] text-[17px] text-[#d02222] font-Roboto">
            US${totalPrice}
          </h4>
        </div>
        <div>
          <BsCartPlus size={20} className="cursor-pointer" tile="Add to cart" />
        </div>
      </div>
    </div>
  );
};

export default WishListItem;
