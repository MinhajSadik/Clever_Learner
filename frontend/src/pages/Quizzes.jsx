import { default as React, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import Quiz from "../Components/Quiz/Quiz";
import { allQuiz } from "../redux/features/quizSlice";

const Quizzes = () => {
  const dispatch = useDispatch();
  const { quizzes, loading, error } = useSelector((state) => ({
    ...state.quiz,
  }));

  useEffect(() => {
    dispatch(allQuiz());
  }, [dispatch]);

  return (
    <div className="">
      <div className="justify-self-center">
        <h1 className="font-bold text-2xl text-center m-5">
          Prepare By Topics
        </h1>
      </div>
      {quizzes.map((quiz) => (
        <Quiz key={quiz._id} quiz={quiz} />
      ))}
    </div>
  );
};

export default Quizzes;
