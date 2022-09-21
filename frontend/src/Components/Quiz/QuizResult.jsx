import React from "react";
import Confetti from "react-confetti";

const QuizResult = ({ correct }) => {
  const quiz = JSON.parse(localStorage.getItem("quiz"));
  let score = ((correct / quiz.questions.length) * 100).toFixed(0);

  return (
    <>
      <div className="absolute top-0 left-0 h-screen w-full flex items-center bg-[rgba(0,0,0,.5)]">
        <Confetti />

        <div className=" text-center bg-white p-8 mx-auto rounded-lg max-w-[600px] w-11/12">
          <h4 className="text-3xl pb-3 text-center font-bold">
            Your score is{" "}
            <span className={score > 40 ? "text-green-600" : "text-red-600"}>
              {score}%
            </span>
          </h4>
          <p className="py-2">
            You got {correct}/{quiz.questions.length}
          </p>
          {score > 40 && <p className="py-2 font-medium">Congrats!!!</p>}
          <button
            className="bg-yellow-600 py-2 px-7 rounded-xl text-white mt-2 hover:bg-yellow-500"
            onClick={() => {}}
          >
            Play Again
          </button>
        </div>
      </div>
    </>
  );
};

export default QuizResult;
