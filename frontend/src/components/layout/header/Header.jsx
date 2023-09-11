import React, { useState } from "react";
import { Link, NavLink } from "react-router-dom";
import { AiOutlineHeart } from "react-icons/ai";
import { CgProfile } from "react-icons/cg";
import { useSelector } from "react-redux";
import { orderSelector, userSelector } from "../../../tookit/selector";
import { FaShoppingCart } from "react-icons/fa";
import { getListFavorite } from "../../../tookit/favorite/favoriteSlide";
import FavoriteList from "../favorite/FavoriteList";

const Header = () => {
  const user = useSelector(userSelector);
  const [active, setActive] = useState(false);
  const [onScroll, setOnScroll] = useState(false);
  const quantityCart = useSelector(orderSelector);
  const { listFavorite } = useSelector(getListFavorite);
  const [open, setOpen] = useState(false);

  window.onscroll = () => {
    setOnScroll(window.scrollY === 0 ? false : true);
    return () => (window.onscroll = null);
  };

  window.addEventListener("scroll", () => {
    if (window.scrollY > 100) {
      setActive(true);
    } else {
      setActive(false);
    }
  });

  return (
    <div className={onScroll ? `scrolled` : `navbar`}>
      <div className="flex w-[90%] justify-between mx-auto ">
        <div>
          <NavLink to="/" className="mr-3 link text-2xl">
            Home
          </NavLink>
          <NavLink to="/products/All" className=" ml-1link text-2xl">
            Products
          </NavLink>
        </div>
        <div className="title-navbar">boutique</div>
        <div className="flex justify-between relative items-center">
          <div onClick={() => setOpen(true)}>
            <AiOutlineHeart size={25} className="mr-1" />
            <span className="absolute right-[110px] top-0 rounded-full bg-[#3bc177] w-4 h-4 top right p-0 m-0 text-white font-mono text-[12px] leading-[1.4] text-center">
              {listFavorite.length}
            </span>
          </div>
          <NavLink to="cart" className="icon-navbar link">
            <span className="absolute right-[75px] top-0 rounded-full bg-[#3bc177] w-4 h-4 top right p-0 m-0 text-white font-mono text-[12px] leading-[1.4] text-center">
              {quantityCart.length}
            </span>
            <FaShoppingCart className="mr-1" size={25} />
            Cart
          </NavLink>
          {user ? (
            <Link to="/profile">
              <img
                src={`${user.avatar}`}
                className="w-[35px] h-[35px] rounded-full"
                alt=""
              />
            </Link>
          ) : (
            <Link to="/login">
              <CgProfile size={25} />
            </Link>
          )}
        </div>
      </div>
      {open && <FavoriteList setOpen={setOpen} />}
    </div>
  );
};

export default Header;
