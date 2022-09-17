import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { getQuizById } from "../../redux/features/quizSlice";
import Loading from "../Shared/Loading";
import { AddQuestion } from "./AddQuestion";

const QuizDetails = () => {
  const { user, quiz, loading } = useSelector((state) => ({
    ...state.user,
    ...state.quiz,
  }));

  const admin = user?.user?.role === "admin";

  const { id } = useParams();
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getQuizById(id));
  }, [dispatch, id]);

  return (
    <>
      {loading ? (
        <Loading />
      ) : (
        <div>
          <div className=" w-11/12 h-96 pt-5 mt-5 bg-white">
            <div className="flex justify-center">
              {admin && <AddQuestion quizId={id} />}
            </div>
            <div className="w-full shadow m-10 p-4 ml-12 flex items-center">
              <div className="">
                <img className="w-96" src={quiz.image?.url} alt="quizImage" />
              </div>
              <div className="flex flex-col justify-center w-4/5 ml-52 ">
                <h1 className="text-2xl m-2 text-black-400/25">
                  Quiz Name :
                  <span className="uppercase shadow-sm m-1 text-center w-32 h-8 bg-blue-400 rounded-md p-1">
                    {quiz.name}
                  </span>
                </h1>
                <p className="m-2 text-black-400/25">
                  Quiz Description :
                  <span className="uppercase shadow-sm m-1 text-center w-20 h-8 bg-blue-400 rounded-md p-1">
                    {quiz.description}
                  </span>
                </p>
                <p className="m-2 text-black-400/25">
                  Quiz Price :
                  <span className="uppercase shadow-sm m-1 text-center w-20 h-8 bg-blue-400 rounded-full p-1">
                    ${quiz.price}
                  </span>
                </p>
                <p className="m-2 text-black-400/25">
                  Quiz Time :
                  <span className="uppercase shadow-sm m-1 text-center w-20 h-8 bg-blue-400 rounded-md p-1">
                    {quiz.duration}
                  </span>
                </p>
                <p className="m-2 text-black-400/25">
                  Show Answer :
                  <span className="uppercase shadow-sm m-1 text-center w-20 h-8 bg-blue-400 rounded-md p-1">
                    {quiz.answerType}
                  </span>
                </p>
                <p className="">
                  Questions :
                  <span className="uppercase shadow-sm m-3 text-center w-32 h-8 bg-yellow-400 rounded-md p-1">
                    {quiz.quizzes?.length}
                  </span>
                </p>
              </div>
              <div className="flex justify-center items-center rounded-full  text-white bg-black w-20 h-10">
                <button onClick={() => {}}>start</button>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default QuizDetails;
