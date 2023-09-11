import { useState } from "react";
import styles from "../../../../../styles/styles";
import { useNavigate } from "react-router-dom";

const Dropdown = ({ categoriesData, setDropDown }) => {
  const navigate = useNavigate();

  const handleClick = (cateInfo) => {
    navigate(`/products?category=${cateInfo.title}`);
    setDropDown(false);
  };

  return (
    <div className="pb-4 w-[250px] bg-[#fff] absolute z-30 rounded-b-md shadow-sm">
      {categoriesData
        ? categoriesData.map((cateInfo, i) => (
            <div
              className={`${styles.noramlFlex}`}
              onClick={() => handleClick(cateInfo)}
            >
              <img
                src={cateInfo.image_Url}
                alt=""
                style={{
                  width: "25px",
                  height: "25px",
                  objectFit: "contain",
                  marginLeft: "10px",
                  userSelect: "none",
                }}
              />
              <h3 className="m-3 cursor-pointer select-none">
                {cateInfo.title}
              </h3>
            </div>
          ))
        : null}
    </div>
  );
};

export default Dropdown;
