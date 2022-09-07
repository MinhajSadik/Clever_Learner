import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { allQuiz } from "../redux/features/quizSlice";

const Home = () => {
  const dispatch = useDispatch();
  const { quizzes, loading, error } = useSelector((state) => ({
    ...state.quiz,
  }));

  useEffect(() => {
    dispatch(allQuiz());
  }, [dispatch]);

  return <div className="">Home</div>;
};

export default Home;
