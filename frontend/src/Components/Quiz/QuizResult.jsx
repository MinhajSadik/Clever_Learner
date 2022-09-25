import React, { useState } from "react";
import Confetti from "react-confetti";
import { useNavigate } from "react-router-dom";

const QuizResult = ({ answer, length }) => {
  const navigate = useNavigate();
  const quiz = JSON.parse(localStorage.getItem("quiz"));
  const quiz_type = quiz.answerType === "quiz_based";
  const [index, setIndex] = useState(0);
  const [winner, setWinner] = useState(false);
  const correct = answer.filter((ans) => {
    return ans.isCorrect;
  });

  let score = ((correct.length / quiz.questions.length) * 100).toFixed(0);

  const handlePlayAgain = () => {
    navigate(-1);
  };

  const handleCheck = () => {
    if (length - 1 === index) {
      setWinner(true);
    } else {
      setIndex((prevIndex) => prevIndex + 1);
    }
  };

  return (
    <>
      <div className="absolute top-0 left-0 h-screen w-full flex items-center bg-[rgba(0,0,0,.5)]">
        {score > 40 && <Confetti />}
        {score >= 60 && ((<Confetti />), (<Confetti />))}
        {score >= 80 && ((<Confetti />), (<Confetti />), (<Confetti />))}
        <div className=" text-center bg-white p-8 mx-auto rounded-lg max-w-[600px] w-11/12">
          <h4 className="text-3xl pb-3 text-center font-bold">
            Your score is{" "}
            <span className={score > 40 ? "text-green-600" : "text-red-600"}>
              {score}%
            </span>
          </h4>
          <p className="py-2">
            You got {correct.length}/{quiz.questions.length}
          </p>
          {score > 40 && <p className="py-2 font-medium">Congrats!!!</p>}

          {quiz_type && !winner && (
            <div>
              <div className="flex w-4/5 justify-center">
                <h1 className="text-2xl m-2 text-black-400/25">{index + 1}.</h1>
                <h1 className="text-2xl m-2 text-black-400/25">
                  {quiz.questions[index].question}
                </h1>
              </div>
              <ol className=" w-3/5 ml-44">
                <li
                  className={
                    "border border-gray-300 cursor-pointer m-2 p-2 rounded-lg flex justify-between items-center"
                  }
                >
                  {quiz.questions[index].answer}
                </li>
              </ol>
            </div>
          )}
          {quiz_type && !winner ? (
            <button
              className="bg-yellow-600 py-2 px-7 rounded-xl text-white mt-2 hover:bg-yellow-500"
              onClick={handleCheck}
            >
              Check
            </button>
          ) : (
            <button
              className="bg-yellow-600 py-2 px-7 rounded-xl text-white mt-2 hover:bg-yellow-500"
              onClick={handlePlayAgain}
            >
              Play Again
            </button>
          )}
        </div>
      </div>
    </>
  );
};

export default QuizResult;
