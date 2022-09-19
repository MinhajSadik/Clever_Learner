import React, { useState } from "react";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import Loading from "../Shared/Loading";
import QuizTimer from "./QuizTimer";

const PlayQuiz = () => {
  const quiz = JSON.parse(localStorage.getItem("quiz"));
  const { user, loading } = useSelector((state) => ({
    ...state.user,
  }));
  const [num, setNum] = useState(0);
  const admin = user?.user?.role === "admin";
  const [ans, setAns] = useState([]);
  const [showResult, setShowResult] = useState(false);
  const [submitQuiz, setSubmitQuiz] = useState(false);
  const [disable, setDisable] = useState(null);
  const [showNext, setShowNext] = useState(false);
  const [time, setTime] = useState();

  const handleQue = (index) => {
    setDisable(index);
  };

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
                  <h1 className="text-2xl m-2 text-black-400/25">{num + 1}.</h1>
                  <h1 className="text-2xl m-2 text-black-400/25">
                    {quiz.questions[num].question}
                  </h1>
                </div>

                {admin && (
                  <p className="border-teal-500 rounded-2xl absolute right-16 top-20 border-2 mb-8 p-1 pl-3 pr-2">
                    Attempted : {num + "/" + quiz.questions.length}
                  </p>
                )}
                <div className=" font-serif text-slate-900">
                  <div className="flex text-center">
                    <p className="border-teal-500 rounded-2xl border-2 mb-8 p-1 pl-3 pr-2 w-48 h-10 bg-blue-200 mr-2">
                      Time Left:
                      {quiz.questions.length && (
                        <QuizTimer
                          duration={quiz.answerType}
                          time={time}
                          setTime={setTime}
                        />
                      )}
                    </p>
                    <p className="border-teal-500 rounded-2xl border-2 mb-8 p-1 pl-3 pr-2 w-48 h-10">
                      Questions: {num + "/" + quiz.questions.length}
                    </p>
                  </div>
                </div>
              </div>
              <ol className=" w-3/5 ml-64" disabled={disable}>
                {quiz.questions[num].options?.map((option, index) => (
                  <li
                    key={index}
                    className={
                      index === disable && disable != null
                        ? "show border border-gray-300 cursor-pointer m-2 p-2 rounded-lg"
                        : `notshow border border-gray-300 cursor-pointer m-2 p-2 rounded-lg`
                    }
                    onClick={(e) => {
                      setAns([...ans, option.option]);
                      handleQue(index);
                      setShowNext(true);
                    }}
                  >
                    👉 {option.option}
                  </li>
                ))}
              </ol>
              <div className="mt-3 ml-80 pl-48 text-center">
                {!submitQuiz && showNext && (
                  <button
                    className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded mr-1"
                    onClick={() => {
                      setNum(num + 1);
                      setDisable(null);
                      setShowNext(false);
                      if (quiz.questions.length - 2 === num) {
                        setSubmitQuiz(true);
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
                      if (quiz.questions.length - 2 === num) {
                        setSubmitQuiz(true);
                      }
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
