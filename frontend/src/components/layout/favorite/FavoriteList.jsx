import styles from "../../../styles/styles";
import React from "react";
import { RxCross1 } from "react-icons/rx";
import { IoBagHandleOutline } from "react-icons/io5";
import { useSelector } from "react-redux";
import { getListFavorite } from "../../../tookit/favorite/favoriteSlide";
import FavoriteItem from "./FavoriteItem";

const FavoriteList = ({ setOpen }) => {
  const { listFavorite } = useSelector(getListFavorite);

  return (
    <div className="fixed top-0 left-0 w-full bg-[#0000004b]  overflow-y-auto z-10">
      <div className="fixed top-0 right-0 h-[666px] w-[50%] 800px:w-[25%] bg-white flex flex-col overflow-y-scroll justify-between shadow-sm">
        {listFavorite.length === 0 ? (
          <div className="w-auto h-52 flex items-center justify-center">
            <div className="flex w-full justify-end pt-5 pr-5 fixed top-3 right-3">
              <RxCross1
                size={25}
                className="cursor-pointer"
                onClick={() => setOpen(false)}
              />
            </div>
            <h5>Cart Items is empty!</h5>
          </div>
        ) : (
          <>
            <div className="flex w-full justify-end pt-5 pr-5">
              <RxCross1
                size={25}
                className="cursor-pointer"
                onClick={() => setOpen(false)}
              />
            </div>
            {/* Item length */}

            <div className={`${styles.noramlFlex} p-4`}>
              <IoBagHandleOutline size={25} />
              <h5 className="pl-2 text-[20px] font-[500]">
                {listFavorite.length} items
              </h5>
              <div>
                {listFavorite.map((it) => (
                  <FavoriteItem key={it._id} data={it} />
                ))}
              </div>
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default FavoriteList;
