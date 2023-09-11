import React, { useEffect, useState } from "react";
import { Link, NavLink, useNavigate } from "react-router-dom";
import bannerCart from "../../asset/bannerCart.jpg";
import axios from "axios";

import ProductRow from "./productRow";
import { useDispatch, useSelector } from "react-redux";
import { orderSelector } from "../../tookit/selector";
import orderSlice from "../../tookit/orders/orderSlice";

const CartDetail = () => {
  const listPro = useSelector(orderSelector);
  const [list, setList] = useState([]);
  const [totalPro, setTotalPro] = useState(0);
  const [totalCost, setTotalCost] = useState(0);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    setList(listPro);
    setTotalPro(listPro.reduce((acc, cur) => acc + cur.quantity, 0));
    setTotalCost(
      listPro.reduce((acc, cur) => acc + cur.price * cur.quantity, 0),
    );
  }, [listPro]);

  const increQuanPro = (id) => {
    dispatch(orderSlice.actions.increQuantityProduct({ id }));
  };

  const decreQuanPro = (id) => {
    dispatch(orderSlice.actions.decreQuantityProduct({ id }));
  };

  const removePro = (id) => {
    dispatch(orderSlice.actions.removeOrder({ id }));
  };

  const handleCheckout = async () => {
    try {
      await Promise.all(
        listPro.map(async (it) => {
          await axios.patch(
            `product/updateQuantity/${it._id}?quantity=${it.quantity}`,
          );
        }),
      );
      navigate("/checkout", { state: { cost: totalCost, list } });
    } catch (err) {
      console.log(err.message);
    }
  };

  return (
    <>
      <img src={bannerCart} className=" -mb-11" alt="" />
      <div className="container grid grid-cols-4 gap-2">
        <div className="tableListProducts col-span-3">
          <table className="table-auto w-[100%] text-center">
            <thead className="bg-gray-200 tracking-widest">
              <tr>
                <th className="w-[21%]">IMAGE</th>
                <th>PRODUCT</th>
                <th>PRICE</th>
                <th>QUANTITY</th>
                <th>TOTAL</th>
                <th>REMOVE</th>
              </tr>
            </thead>
            <tbody>
              {list.map((picked, id) => {
                return (
                  <ProductRow
                    picked={picked}
                    key={id}
                    decre={decreQuanPro}
                    del={removePro}
                    incre={increQuanPro}
                  />
                );
              })}
            </tbody>
          </table>
          <div className="semii-final flex justify-between bg-gray-200 m-3 py-2 ">
            <NavLink to="/products/All">⬅ Tiếp tục mua sắm</NavLink>
          </div>
        </div>
        <div className=" col-span-1 p-4 bg-gray-200 text-black font-bold uppercase h-fit sticky top-[81px]">
          <div className="text-xl  mb-4">cart total</div>
          <div className="">
            <span>Tổng số lượng: </span> <span>{totalPro}</span>
            <hr className="border-1 border-black my-2" />
          </div>
          <div className="total">
            <span>Tổng: </span>
            <span>{new Intl.NumberFormat("en-DE").format(totalCost)} VND</span>
          </div>
          <div className="mt-4">
            <input
              type="text"
              className="p-2 w-[100%]"
              placeholder="Enter your coupon"
            />

            <button
              onClick={handleCheckout}
              className="bg-gray-400 w-[100%] p-2"
            >
              🎉🧧🎁 Checkout
            </button>
          </div>
        </div>
      </div>
    </>
  );
};

export default CartDetail;
