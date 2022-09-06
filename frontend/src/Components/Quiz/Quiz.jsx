import React from "react";
import { Link } from "react-router-dom";

const Quiz = ({ quiz }) => {
  return (
    <div className="grid grid-cols-2 w-11/12 p-10 m-auto gap-8 shadow-2xl">
      <Link to={quiz._id}>
        <div className="border-2 cursor-pointer topicdiv text-white font-sans text-4xl font-bold  h-36 justify-items-center rounded-2xl pl-10 flex ">
          <div className="w-3/5 h-full bg-rgb(27,169,76)">
            <p className="pt-6 pl-0 topicdivh1 ">HTML</p>
          </div>
          <img className="w-2/5  rounded-2xl" src={quiz.image?.url} alt="" />
        </div>
      </Link>
    </div>
  );
};

export default Quiz;
