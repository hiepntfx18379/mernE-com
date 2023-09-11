import React from "react";
import { RxCross1 } from "react-icons/rx";
import { useDispatch } from "react-redux";
import favoriteSlide from "../../../tookit/favorite/favoriteSlide";
import { Link } from "react-router-dom";

const FavoriteItem = ({ data }) => {
  const dispatch = useDispatch();
  const handleRemove = (id) => {
    dispatch(favoriteSlide.actions.removeFromList(id));
  };

  return (
    <Link to={`product/${data.name}`}>
      <div className="border-b p-4">
        <div className="w-full flex items-center relative">
          <img
            src={`${data?.photos[0]}`}
            alt=""
            className="w-[130px] h-min ml-2 mr-2 rounded-[5px]"
          />
          <div className="pl-[5px]">
            <h1>{data.name}</h1>
            <h4 className="font-[400] text-[15px] text-[#00000082]">
              {new Intl.NumberFormat("en-DE").format(data.price)} VND
            </h4>
          </div>
          <RxCross1
            className="cursor-pointer absolute right-2 top-2"
            onClick={() => handleRemove(data._id)}
          />
        </div>
      </div>
    </Link>
  );
};

export default FavoriteItem;
