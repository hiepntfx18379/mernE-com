import { Link, useNavigate } from "react-router-dom";

const ItemProductSearch = ({ pro, setTextSearch }) => {
  const navigate = useNavigate();
  const clickHandler = () => {
    setTextSearch("");
    navigate(`/product/${pro.name}`);
  };
  return (
    <>
      <div
        className="w-full flex items-start-py-3 cursor-pointer"
        onClick={clickHandler}
      >
        <img
          src={`${pro.image_Url[0]?.url}`}
          alt=""
          className="w-[40px] h-[40px] mr-[10px]"
        />
        <h1>{pro.name}</h1>
      </div>
    </>
  );
};

export default ItemProductSearch;
