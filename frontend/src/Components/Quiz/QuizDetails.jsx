import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useParams } from "react-router-dom";
import { allQuestion } from "../../redux/features/questionSlice";
import Timer from "../../utils/timer";
import { AddQuestion } from "./AddQuestion";
import { AddQuiz } from "./AddQuiz";

const QuizDetails = () => {
  const { user } = useSelector((state) => state.user);
  const admin = user?.user?.role === "admin";
  const { id } = useParams();
  const dispatch = useDispatch();
  const [quizOpen, setQuizOpen] = useState(false);
  const [questionOpen, setQuestionOpen] = useState(false);
  const [time, setTime] = useState(0);
  const [open, setOpen] = useState(false);
  console.log(id);

  const handleQuizOpen = () => {
    setQuizOpen(!quizOpen);
    setQuestionOpen(false);
  };

  const handleQuestionOpen = () => {
    setQuestionOpen(!questionOpen);
    setQuizOpen(false);
  };

  useEffect(() => {
    dispatch(allQuestion());
  }, [dispatch]);

  return (
    <div>
      {quizOpen && <AddQuiz id={id} />}
      {questionOpen && <AddQuestion id={id} />}

      <div className=" w-11/12 h-96 pt-5 mt-16 bg-white">
        <div className="w-full shadow-lg  m-4 p-4 ml-12">
          <div className="flex justify-between align-middle">
            <div className="flex w-4/5 pl-24 ml-12">
              <h1 className="text-2xl m-2 text-black-400/25">{"Minhaj"}</h1>
              <h1 className="text-2xl m-2 text-black-400/25">
                {/* {questionArr[num]?.questions} */}
              </h1>
            </div>
            {admin && (
              <div className="">
                <button
                  className="border-teal-500 rounded-2xl absolute  right-24 top-32 border-2 mb-8 p-1 pl-3  pr-2"
                  type="button"
                  onClick={handleQuizOpen}
                >
                  Add Quiz
                </button>
                <button
                  className="border-teal-500 rounded-2xl absolute right-48 top-32 border-2 mb-8 p-1 pl-3 pr-2"
                  type="button"
                  onClick={handleQuestionOpen}
                >
                  Add Question
                </button>
              </div>
            )}
            <div className="">Time: {<Timer duration="quiz_based" />}</div>
            <div className=" font-serif text-slate-900">
              {/* {num + "/" + (questionArr.length)} */}
            </div>
          </div>
          <ol className=" w-3/5 ml-64">
            {/* {questionArr[num]?.options?.map((answer, index) => (
              <li
                key={index}
                className={
                  index == disable && disable != null
                    ? "show border border-gray-300 text-center cursor-pointer m-2 p-2 rounded-lg"
                    : `notshow border border-gray-300 text-center cursor-pointer m-2 p-2 rounded-lg`
                }
                onClick={(e) => {
                  setAns([...ans, answer.option]);

                  handleQue(index);
                }}
              >
                {answer.option}
              </li>
            ))} */}
          </ol>
          <div className="mt-3 ml-80 pl-48">
            <button
              className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded mr-1"
              onClick={() => {
                // setNum(num + 1);
                // setDisable(null);
              }}
            >
              Skip
            </button>
            {open ? (
              <Link to="/showallanswer">
                {" "}
                <button
                  className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-3 rounded mr-1"
                  onClick={() => {
                    // dispatch(postUserResult(ans));
                    // const obj = {
                    //   quizId: quizID,
                    //   userId: userID,
                    //   quizResult: ans,
                    // };
                    // dispatch(postQuizResult(obj));
                  }}
                >
                  Result
                </button>
              </Link>
            ) : (
              <button
                className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-3 rounded mr-1"
                onClick={() => {
                  //   setNum(num + 1);
                  //   setDisable(null);
                  //   if (questionArr.length - 2 == num) {
                  //     setBtnshow(true);
                  //   }
                }}
              >
                Submit
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default QuizDetails;
