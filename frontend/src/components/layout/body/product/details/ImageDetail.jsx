import React from "react";

const ImageDetail = ({ data, img, id, ClickChangeImg }) => {
  return (
    <div onClick={() => ClickChangeImg(id)}>
      <img src={data.photos[img]} className=" img-detail" alt="" />
    </div>
  );
};

export default ImageDetail;
