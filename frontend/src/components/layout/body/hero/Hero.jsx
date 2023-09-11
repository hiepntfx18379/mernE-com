import React from "react";
import banner1 from "../../../../asset/banner1.jpg";
import styles from "../../../../styles/styles";
import { Link, useNavigate } from "react-router-dom";

const Hero = () => {
  return (
    <div
      className={`relative min-h-[70vh] 800px:min-h-[80vh] bg-center w-[100%] bg-no-repeat ${styles.noramlFlex}`}
      style={{ backgroundImage: `url(${banner1})` }}
    >
      <div className={`${styles.section} w-[90%] 800px:w-[60%]`}>
        <h1
          className={`text-[35px] leading-[1.2] 800px:text-[60px] text-[#3d3a3a] font-[600] capitalize`}
        >
          Best tech devices <br /> for your Life
        </h1>
        <div className="uppercase text-sm text-gray-400 ">
          new inspiration 2023
        </div>
        <div className="text-4xl mb-4 mt-4 w-[90%] font-semibold uppercase">
          20% off on new season
        </div>

        <Link to="/products" className="inline-block">
          <div className={`${styles.button} mt-5`}>
            <span className="text-[#fff] front-[Poppins] text-[18px]">
              Shop now
            </span>
          </div>
        </Link>
      </div>
    </div>
  );
};

export default Hero;
