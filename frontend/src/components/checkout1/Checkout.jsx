import React, { useState } from "react";
import { useLocation } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import ShipingInfo from "./ShipingInfo";
import { userSelector } from "../../tookit/selector";
import Bill from "./Bill";
import { toast } from "react-toastify";
import axios from "axios";
import orderSlice from "../../tookit/orders/orderSlice";

const Checkout = () => {
  const [country, setCountry] = useState("");
  const [city, setCity] = useState("");
  const [userInfo, setUserInfo] = useState(false);
  const [address1, setAddress1] = useState("");
  const [address2, setAddress2] = useState("");
  const [zipCode, setZipCode] = useState(null);

  const location = useLocation();
  const user = useSelector(userSelector);
  let cost = location.state.cost;
  let listOrder = location.state.list;
  const dispatch = useDispatch();

  const handleSubmit = async (e) => {
    e.preventDefault();
    const infoOrder = {
      ...user,
      addresses: [`${address1}, ${city}, ${country}`],
      listOrder,
      cost: cost + 30000,
    };
    await axios.post(
      "https://ecomserver-9b4w.onrender.com/api/order/verify",
      infoOrder,
    );
    dispatch(orderSlice.actions.refeshCart([]));
    toast.success("Order successfully");
  };

  return (
    <div className="w-full flex flex-col items-center py-8">
      <div className="w-[90%] 1000px:w-[70%] block 800px:flex">
        <div className="w-full 800px:w-[65%]">
          <ShipingInfo
            user={user}
            country={country}
            setCountry={setCountry}
            city={city}
            setCity={setCity}
            userInfo={userInfo}
            setUserInfo={setUserInfo}
            address1={address1}
            setAddress1={setAddress1}
            address2={address2}
            setAddress2={setAddress2}
            zipCode={zipCode}
            setZipCode={setZipCode}
          />
        </div>
        <div className="w-full 800px:w-[35%] 800px:mt-0 mt-8">
          <Bill handleSubmit={handleSubmit} cost={cost} list={listOrder} />
        </div>
      </div>
    </div>
  );
};

export default Checkout;
