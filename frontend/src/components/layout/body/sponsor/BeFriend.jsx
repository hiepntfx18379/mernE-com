import React from "react";

const BeFriend = () => {
  return (
    <div className="container flex justify-between ">
      <div className="-mt-10 mb-10 ">
        <div className="text-main-title uppercase text-xl">
          let's be friends!
        </div>

        <div className=" text-seconds-title ">
          sporting and live streaming on RFI
        </div>
      </div>

      <div className="-mt-10 mb-10">
        <input
          type="text"
          style={{ border: "1px solid black" }}
          className="w-[350px] p-3 border-slate-400  "
          placeholder="Enter your email"
        />
        <button className=" text-gray-400  bg-gray-800 px-4 py-3 h-[50px] ">
          Subscribe
        </button>
      </div>
    </div>
  );
};

export default BeFriend;
