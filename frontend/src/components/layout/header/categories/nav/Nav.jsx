import React, { useEffect, useState } from "react";
import styles from "../../../../../styles/styles";
import { navItems } from "../../../../../static/data.js";
import { Link } from "react-router-dom";

const Nav = ({ active }) => {
  return (
    <div className={`block 800px:${styles.noramlFlex}`}>
      {navItems.map((navInfo, index) => (
        <div className="flex">
          <Link
            to={navInfo.url}
            className={`${
              active === index + 1
                ? "text-[#FCA311]"
                : "text-black 800px:text-[#fff]"
            } pb-[30px] 800px:pb-0 font-[500] px-6 cursor-pointer}`}
          >
            {navInfo.title}
          </Link>
        </div>
      ))}
    </div>
  );
};

export default Nav;
