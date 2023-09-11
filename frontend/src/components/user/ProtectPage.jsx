import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { userSelector } from "../../tookit/selector";
import { Navigate } from "react-router-dom";
import { getUser } from "../../tookit/user/userSlice";

const ProtectPage = ({ children }) => {
  const dispatch = useDispatch();
  const user = useSelector(userSelector);
  useEffect(() => {
    dispatch(getUser());
  }, [dispatch]);
  return user ? children : <Navigate to="/login" replace />;
};

export default ProtectPage;
