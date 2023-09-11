import React from "react";

const Bill = ({ handleSubmit, cost, list }) => {
  return (
    <div className="w-full bg-[#fff] rounded-md pb-8">
      {list.map((it, i) => {
        return (
          <div className="flex justify-start">
            <h5 className="text-[18px] font-[600]">
              <span>{it.name} x</span>
              <span> {it.quantity}</span>
            </h5>
          </div>
        );
      })}
      <br />

      <div className="flex justify-between">
        <h3 className="text-[16px] font-[400] text-[#000000a4]">subtotal:</h3>
        <h5 className="text-[18px] font-[600]">
          <span>{new Intl.NumberFormat("en-DE").format(cost)} VND</span>
        </h5>
      </div>
      <br />
      <div className="flex justify-between">
        <h3 className="text-[16px] font-[400] text-[#000000a4]">shipping:</h3>
        <h5 className="text-[18px] font-[600]">
          <span>{new Intl.NumberFormat("en-DE").format(30000)} VND</span>
        </h5>
      </div>
      <br />

      <div className="flex justify-between">
        <h3 className="text-[16px] font-[400] text-[#000000a4]">total:</h3>
        <h5 className="text-[18px] font-[600]">
          <span>{new Intl.NumberFormat("en-DE").format(cost + 30000)} VND</span>
        </h5>
      </div>
      <br />
      <form onSubmit={handleSubmit}>
        <input
          className={`w-full h-[40px] border border-[#f63b60] text-center text-[#f63b60] rounded-[3px] mt-8 cursor-pointer`}
          required
          value="Order"
          type="submit"
        />
      </form>
    </div>
  );
};

export default Bill;
