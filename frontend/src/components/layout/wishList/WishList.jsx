import React, { useState } from "react";
import { RxCross1 } from "react-icons/rx";
import styles from "../../../styles/styles";
import { AiOutlineHeart } from "react-icons/ai";
import { productData } from "../../../static/data";
import WishListItem from "./WishListItem";

const WishList = ({ setOpenWishList }) => {
  const [wishlist, setWishlist] = useState(() => {
    return productData.slice(0, 3);
  });

  return (
    <div className="fixed top-0 left-0 w-full bg-[#0000004b] h-screen z-10">
      <div className="fixed top-0 right-0 h-full w-[80%] overflow-y-scroll 800px:w-[25%] bg-white flex flex-col justify-between shadow-sm">
        {wishlist && wishlist.length === 0 ? (
          <div className="w-full h-screen flex items-center justify-center">
            <div className="flex w-full justify-end pt-5 pr-5 fixed top-3 right-3">
              <RxCross1
                size={25}
                className="cursor-pointer"
                onClick={() => setOpenWishList(false)}
              />
            </div>
            <h5>Wishlist Items is empty!</h5>
          </div>
        ) : (
          <div>
            <div className="flex w-full justify-end pt-5 pr-5">
              <RxCross1
                size={25}
                className="cursor-pointer"
                onClick={() => setOpenWishList(false)}
              />
            </div>
            {/* Item length */}
            <div className={`${styles.noramlFlex} p-4`}>
              <AiOutlineHeart size={25} />
              <h5 className="pl-2 text-[20px] font-[500]">
                {wishlist && wishlist.length} items
              </h5>
            </div>

            {/* cart Single Items */}
            <br />
            <div className="w-full border-t">
              {wishlist &&
                wishlist.map((dt, index) => (
                  <WishListItem key={index} data={dt} />
                ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default WishList;
