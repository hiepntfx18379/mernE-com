import React, { useEffect } from "react";
import Header from "../components/layout/header/Header";
import Footer from "../components/layout/body/footer/Footer";
import { Outlet } from "react-router-dom";
import { useDispatch } from "react-redux";
import { getUser } from "../tookit/user/userSlice";
import MessengerCustomerChat from "react-messenger-customer-chat";

const ParentsPage = () => {
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getUser());
  }, [dispatch]);
  return (
    <>
      <Header />
      <Outlet />
      <Footer />
      <MessengerCustomerChat pageId="100089223767030" appId="553429326697551" />
    </>
  );
};

export default ParentsPage;
