import React, { useEffect, useState } from "react";
import { BsCheckCircleFill, BsXCircleFill } from "react-icons/bs";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import Loading from "../Shared/Loading";
import QuizResult from "./QuizResult";
import QuizTimer from "./QuizTimer";

const PlayQuiz = () => {
  const quiz = JSON.parse(localStorage.getItem("quiz"));
  const length = quiz.questions.length;
  const question_based = quiz.answerType === "question_based";
  const quiz_based = quiz.answerType === "quiz_based";
  const { user, loading } = useSelector((state) => ({
    ...state.user,
  }));

  const [index, setIndex] = useState(0);
  const admin = user?.user?.role === "admin";
  const [ans, setAns] = useState([]);
  const [showResult, setShowResult] = useState(false);
  const [submitQuiz, setSubmitQuiz] = useState(false);
  const [showNext, setShowNext] = useState(true);
  const [timeStart, setTimeStart] = useState(false);

  useEffect(() => {
    setTimeStart(true);
  }, [index]);

  return (
    <>
      {loading ? (
        <Loading />
      ) : (
        <div>
          <div className=" w-11/12 h-96 pt-5 mt-5 bg-white">
            <div className="w-full shadow m-10 p-4 ml-12">
              <div className="flex justify-between align-middle">
                <div className="flex w-4/5 pl-24 ml-12">
                  <h1 className="text-2xl m-2 text-black-400/25">
                    {index + 1}.
                  </h1>
                  <h1 className="text-2xl m-2 text-black-400/25">
                    {quiz.questions[index].question}
                  </h1>
                </div>

                {admin && (
                  <p className="border-teal-500 rounded-2xl absolute right-16 top-20 border-2 mb-8 p-1 pl-3 pr-2">
                    Attempted : {index + "/" + length}
                  </p>
                )}
                <div className=" font-serif text-slate-900">
                  <div className="flex text-center">
                    <p className="border-teal-500 rounded-2xl border-2 mb-8 p-1 pl-3 pr-2 w-48 h-10 bg-blue-200 mr-2">
                      {question_based ? (
                        <>
                          Time Left:
                          {timeStart && (
                            <QuizTimer
                              duration={quiz.answerType}
                              setShowNext={setShowNext}
                            />
                          )}
                        </>
                      ) : (
                        <>{<QuizTimer />}</>
                      )}
                    </p>
                    <p className="border-teal-500 rounded-2xl border-2 mb-8 p-1 pl-3 pr-2 w-48 h-10">
                      Questions: {index + "/" + length}
                    </p>
                  </div>
                </div>
              </div>
              {showResult && <QuizResult />}
              <ol className=" w-3/5 ml-64">
                {quiz.questions[index].options?.map((option, i) => (
                  <li
                    key={i}
                    className={
                      "border border-gray-300 cursor-pointer m-2 p-2 rounded-lg flex justify-between items-center"
                    }
                    onClick={(e) => {
                      setAns([...ans, option.option]);
                      setShowNext(true);
                      setTimeStart(false);
                      if (length - 1 === index) {
                        setSubmitQuiz(true);
                      } else {
                        setIndex((prevIndex) => prevIndex + 1);
                      }
                    }}
                  >
                    👉 {option.option}
                    {option.isCorrect && question_based && !timeStart && (
                      <BsCheckCircleFill />
                    )}
                    {!option.isCorrect && question_based && !timeStart && (
                      <BsXCircleFill />
                    )}
                  </li>
                ))}
              </ol>
              <div className="mt-3 ml-80 pl-48 text-center">
                {!submitQuiz && showNext && (
                  <button
                    className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded mr-1"
                    onClick={() => {
                      if (length - 1 === index) {
                        setSubmitQuiz(true);
                      } else {
                        setIndex((prevIndex) => prevIndex + 1);
                      }
                    }}
                  >
                    Next
                  </button>
                )}

                {showResult && (
                  <Link to="/showallanswer">
                    {" "}
                    <button
                      className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-3 rounded mr-1"
                      onClick={() => {}}
                    >
                      Result
                    </button>
                  </Link>
                )}
                {submitQuiz && (
                  <button
                    className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-3 rounded mr-1"
                    onClick={() => {
                      setShowResult(true);
                    }}
                  >
                    Submit
                  </button>
                )}
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default PlayQuiz;
