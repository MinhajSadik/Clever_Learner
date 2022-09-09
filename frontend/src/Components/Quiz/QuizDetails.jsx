import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import { getQuizById } from "../../redux/features/quizSlice";
import Loading from "../Shared/Loading";
import { AddQuestion } from "./AddQuestion";
import { AddQuiz } from "./AddQuiz";

const QuizDetails = () => {
  const { user, quiz, loading } = useSelector((state) => ({
    ...state.user,
    ...state.quiz,
  }));

  const admin = user?.user?.role === "admin";
  const { id } = useParams();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [quizOpen, setQuizOpen] = useState(false);
  const [questionOpen, setQuestionOpen] = useState(false);
  const [open, setOpen] = useState(false);
  const [num, setNum] = useState(0);
  const [nextClicked, setNextClicked] = useState(false);
  const [timeout, setTimeout] = useState(false);
  const [showResult, setShowResult] = useState(false);
  const [submitQuiz, setSubmitQuiz] = useState(false);
  const [enrolled, setEnrolled] = useState(false);

  // const handleNext = () => {};
  // const handleSubmit = () => {};
  // const handleSkip = () => {};

  const handleQuizOpen = () => {
    setQuizOpen(!quizOpen);
    setQuestionOpen(false);
  };

  const handleQuestionOpen = () => {
    setQuestionOpen(!questionOpen);
    setQuizOpen(false);
  };

  const handleEnroll = () => {
    navigate("/quiz/play");
    localStorage.setItem("quiz", JSON.stringify({ ...quiz.quizzes }));
  };

  useEffect(() => {
    dispatch(getQuizById(id));
  }, [dispatch, id]);

  return (
    <>
      {loading ? (
        <Loading />
      ) : (
        <div>
          {quizOpen && <AddQuiz id={id} />}
          {questionOpen && <AddQuestion id={id} />}
          <div className=" w-11/12 h-96 pt-5 mt-5 bg-white">
            <div className="w-full shadow m-10 p-4 ml-12">
              <div className="flex justify-between align-middle">
                <div className="flex flex-col  w-4/5 pl-24 ml-12">
                  <h1 className="text-2xl m-2 text-black-400/25">
                    {/* {quizzes?.question} */}
                    Quiz Name : {quiz.name}
                  </h1>
                  <p className="text-2xl m-2 text-black-400/25">
                    {/* {quizzes?.question} */}
                    Quiz Description: {quiz.description}
                  </p>
                  <p className="text-2xl m-2 text-black-400/25">
                    {/* {quizzes?.question} */}
                    Quiz Price: {quiz.price}
                  </p>
                  <p className="text-2xl m-2 text-black-400/25">
                    {/* {quizzes?.question} */}
                    Quiz Time: {quiz.duration || "question_based"}
                  </p>
                  <p className="text-2xl m-2 text-black-400/25">
                    {/* {quizzes?.question} */}
                    Show Answer: {quiz.showAnser}
                  </p>
                </div>
                {admin && (
                  <div className="">
                    <button
                      className="border-teal-500 rounded-2xl hover:bg-teal-600 hover:text-white absolute right-16 top-20 border-2 mb-8 p-1 pl-3  pr-2"
                      type="button"
                      onClick={handleQuizOpen}
                    >
                      {quizOpen ? "Close" : "Add Quiz"}
                    </button>
                    <button
                      className="border-teal-500 hover:bg-teal-600 hover:text-white rounded-2xl absolute  right-44 top-20 border-2 mb-8 p-1 pl-3 pr-2"
                      type="button"
                      onClick={handleQuestionOpen}
                    >
                      {questionOpen ? "Close" : "Add Question"}
                    </button>
                  </div>
                )}
              </div>

              <button
                className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded absolute right-36 top-36"
                onClick={handleEnroll}
              >
                Enroll
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default QuizDetails;
