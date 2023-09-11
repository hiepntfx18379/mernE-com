import React, { useCallback } from "react";
import { AiOutlineLogin, AiOutlineMessage } from "react-icons/ai";
import { RiLockPasswordLine } from "react-icons/ri";
import { HiOutlineShoppingBag } from "react-icons/hi";
import { RxPerson } from "react-icons/rx";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { logout } from "../../../tookit/user/userSlice";

const ProfileSideBar = ({ setActive, active }) => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const logoutHandler = useCallback(() => {
    dispatch(logout());
    navigate("/login");
  }, []);

  return (
    <div className="w-full bg-white shadow-sm rounded-[10px] p-4 pt-8">
      <Link
        to="/profile"
        className="flex items-center cursor-pointer w-full mb-8"
        onClick={() => setActive(1)}
      >
        <RxPerson size={30} color={active === 1 ? "red" : ""} />
        <span
          className={`pl-3 ${active === 1 ? "text-[red]" : ""} 800px:block`}
        >
          Profile
        </span>
      </Link>

      <Link
        to="order"
        className="flex items-center cursor-pointer w-full mb-8"
        onClick={() => setActive(2)}
      >
        <HiOutlineShoppingBag size={30} color={active === 2 ? "red" : ""} />
        <span
          className={`pl-3 ${active === 2 ? "text-[red]" : ""} 800px:block`}
        >
          Orders
        </span>
      </Link>

      <Link
        to="inbox"
        className="flex items-center cursor-pointer w-full mb-8"
        onClick={() => setActive(4) || navigate("/inbox")}
      >
        <AiOutlineMessage size={30} color={active === 4 ? "red" : ""} />
        <span
          className={`pl-3 ${active === 4 ? "text-[red]" : ""} 800px:block`}
        >
          Inbox
        </span>
      </Link>

      <Link
        to="change-password"
        className="flex items-center cursor-pointer w-full mb-8"
        onClick={() => setActive(6)}
      >
        <RiLockPasswordLine size={30} color={active === 6 ? "red" : ""} />
        <span
          className={`pl-3 ${active === 6 ? "text-[red]" : ""} 800px:block`}
        >
          Change Password
        </span>
      </Link>

      <div
        className="single_item flex items-center cursor-pointer w-full mb-8"
        onClick={logoutHandler}
      >
        <AiOutlineLogin size={30} color={active === 8 ? "red" : ""} />
        <span
          className={`pl-3 ${active === 8 ? "text-[red]" : ""} 800px:block`}
        >
          Log out
        </span>
      </div>
    </div>
  );
};

export default ProfileSideBar;
