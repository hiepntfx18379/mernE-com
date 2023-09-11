import React, { useState } from "react";
import {
  AiFillHeart,
  AiOutlineHeart,
  AiOutlineShoppingCart,
} from "react-icons/ai";
import { Link } from "react-router-dom";
import ProductPopUpDetail from "./ProductPopUpDetail";
import { useDispatch } from "react-redux";
import favoriteSlide from "../../../../tookit/favorite/favoriteSlide";

const ProductItem = ({ pro }) => {
  const dispatch = useDispatch();
  const [click, setClick] = useState(false);
  const [open, setOpen] = useState(false);

  const handleAddFavorite = (pro) => {
    setClick(!click);
    dispatch(favoriteSlide.actions.addToList(pro));
  };

  const handleRemoveFavorite = (id) => {
    setClick(!click);
    dispatch(favoriteSlide.actions.removeFromList(id));
  };
  return (
    <div>
      <div className="w-full h-[370px] bg-white rounded-lg shadow-sm p-3 relative cursor-pointer">
        <Link to={`/product/${pro?.name}`} title={`${pro?.name}`}>
          <img src={pro.photos[0]} className="hover:opacity-60" alt="" />
        </Link>
        <div className=" font-semibold mt-4 mb-2">
          {pro?.name.length > 24
            ? pro?.name.substring(0, 20) + "..."
            : pro?.name}
        </div>

        <div className="price">
          {new Intl.NumberFormat("en-DE").format(pro.price)} VND
        </div>

        <div>
          {click ? (
            <AiFillHeart
              size={22}
              className="cursor-pointer absolute right-2 top-5"
              color={click ? "red" : "#333"}
              onClick={() => handleRemoveFavorite(pro._id)}
              title="Remove from wishlist"
            />
          ) : (
            <AiOutlineHeart
              size={22}
              className="cursor-pointer absolute right-2 top-5"
              color={click ? "red" : "#333"}
              onClick={() => handleAddFavorite(pro)}
              title="Add to wishlist"
            />
          )}

          <AiOutlineShoppingCart
            size={25}
            className="cursor-pointer absolute right-2 top-12"
            color="#444"
            onClick={() => setOpen(!open)}
            title="Add to cart"
          />
          {open ? <ProductPopUpDetail setOpen={setOpen} data={pro} /> : null}
        </div>
      </div>
    </div>
  );
};

export default ProductItem;
