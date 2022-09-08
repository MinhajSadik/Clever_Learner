import React, { useEffect } from "react";
import { useDispatch } from "react-redux";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "./App.css";
import QuizDetails from "./Components/Quiz/QuizDetails";
import Navbar from "./Components/Shared/Navbar";
import Login from "./Components/User/Login";
import Register from "./Components/User/Register";
import Quizzes from "./pages/Quizzes";
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
    <BrowserRouter>
      <Navbar />
      <ToastContainer />
      <Routes>
        {/* <Route path="/" element={<Home />} /> */}
        <Route path="/" element={<Quizzes />} />
        <Route path="/:id" element={<QuizDetails />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
      </Routes>
    </BrowserRouter>
  );
};

export default App;
