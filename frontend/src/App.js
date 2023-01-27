import React, { useEffect } from "react";
import { useDispatch } from "react-redux";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "./App.css";
import PaidQuiz from "./Components/Quiz/PaidQuiz";
import PlayQuiz from "./Components/Quiz/PlayQuiz";
import QuizDetails from "./Components/Quiz/QuizDetails";
import QuizResult from "./Components/Quiz/QuizResult";
import Navbar from "./Components/Shared/Navbar";
import Login from "./Components/User/Login";
import Register from "./Components/User/Register";
import NotFound from "./pages/NotFound";
import Quizzes from "./pages/Quizzes";
import { setUser } from "./redux/features/userSlice";
import PrivateRoutes from "./routes/PrivateRoutes";

const App = () => {
  const dispatch = useDispatch();
  const user = JSON.parse(sessionStorage.getItem("token"));
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
        <Route path="/" element={<Quizzes />} />
        <Route path="/quiz/payment" element={<PaidQuiz />} />

        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/quiz/:id" element={<QuizDetails />} />
        <Route
          path="/play/quiz"
          element={
            <PrivateRoutes>
              <PlayQuiz />
            </PrivateRoutes>
          }
        />
        <Route
          path="/quiz/result"
          element={
            <PrivateRoutes>
              <QuizResult />
            </PrivateRoutes>
          }
        />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </BrowserRouter>
  );
};

export default App;
