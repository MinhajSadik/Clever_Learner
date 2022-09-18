import React, { useState } from "react";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import Timer from "../../utils/Timer";
import Loading from "../Shared/Loading";

const PlayQuiz = ({ quiz }) => {
  const { user, loading, quizzes } = useSelector((state) => ({
    ...state.user,
    ...state.quiz,
  }));
  const [num, setNum] = useState(0);

  const admin = user?.user?.role === "admin";
  const [showResult, setShowResult] = useState(false);
  const [submitQuiz, setSubmitQuiz] = useState(false);
  const [enrolled, setEnrolled] = useState(false);

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
                    {/* what's your name */}
                  </h1>
                </div>

                {admin && (
                  <p className="border-teal-500 rounded-2xl absolute right-16 top-20 border-2 mb-8 p-1 pl-3 pr-2">
                    Attempted : {num + "/" + 10}
                  </p>
                )}
                <div className=" font-serif text-slate-900">
                  <div className="">
                    {!enrolled && "Time: 02:00"}
                    {enrolled && <Timer duration={quizzes.answerType} />}
                  </div>
                  <div>
                    {/* Questions: {num + "/" + questions.length} */}
                    Question: 10
                  </div>
                </div>
              </div>
              <ol className=" w-3/5 ml-64">
                {quiz.questions[num].options?.map((option, index) => (
                  <li
                    key={index}
                    className="
                   notshow border border-gray-300 cursor-pointer m-2 p-2 rounded-lg
                "
                    onClick={(e) => {
                      // setAns([...ans, answer.option]);
                      // handleQue(index);
                    }}
                  >
                    👉 {option.option}
                  </li>
                ))}
              </ol>
              <div className="mt-3 ml-80 pl-48">
                <button
                  className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded mr-1"
                  onClick={() => {
                    setNum(num + 1);
                    // setDisable(null);
                  }}
                >
                  Next
                </button>
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
                    onClick={() => {}}
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
