import React, { useEffect } from "react";
import { useDispatch } from "react-redux";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "./App.css";
import Navbar from "./Components/Shared/Navbar";
import Login from "./Components/User/Login";
import Register from "./Components/User/Register";
import Home from "./pages/Home";
import { setUser } from "./redux/features/userSlice";

const App = () => {
  const dispatch = useDispatch();
  const user = JSON.parse(localStorage.getItem("token"));
  useEffect(() => {
    if (user) {
      dispatch(setUser(user));
    }
  }, [user, dispatch]);
  return (
    <div className="text-white bg-black">
      <BrowserRouter>
        <Navbar />
        <ToastContainer />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
};

export default App;
