import { default as React, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-toastify";
import AddQuiz from "../Components/Quiz/AddQuiz";
import Quiz from "../Components/Quiz/Quiz";
import Loading from "../Components/Shared/Loading";
import { allQuiz } from "../redux/features/quizSlice";

const Quizzes = () => {
  const dispatch = useDispatch();
  const { quizzes, loading, error } = useSelector((state) => ({
    ...state.quiz,
  }));

  useEffect(() => {
    dispatch(allQuiz());

    if (error) {
      toast.error(error);
    }
  }, [dispatch, error]);

  return (
    <>
      {loading ? (
        <Loading />
      ) : (
        <div className="">
          <div className="justify-self-center">
            <h1 className="font-bold text-2xl text-center m-2">
              Prepare By Topics
            </h1>
          </div>
          <div className="flex justify-center">
            <AddQuiz quizzes={quizzes} />
          </div>
          <div className="grid grid-cols-5 gap-1">
            {quizzes.map((quiz) => (
              <Quiz key={quiz._id} quiz={quiz} />
            ))}
          </div>
        </div>
      )}
    </>
  );
};

export default Quizzes;
