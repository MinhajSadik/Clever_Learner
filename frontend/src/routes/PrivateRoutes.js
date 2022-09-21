import React from "react";
import { useSelector } from "react-redux";
import LoadingToRedirect from "../Components/Shared/LoadingToRedirect";

const PrivateRoutes = ({ children }) => {
  const { loggedIn } = useSelector((state) => state.user);
  return loggedIn ? children : <LoadingToRedirect />;
};

export default PrivateRoutes;
