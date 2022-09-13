import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";

export const AddQuestion = ({ id }) => {
  const data = useSelector((state) => state.quiz);
  const dispatch = useDispatch();
  // console.log(data);
  const [ans, setAns] = useState([
    { option: "", isCorrect: false, id: 1 },
    { option: "", isCorrect: false, id: 2 },
    { option: "", isCorrect: false, id: 3 },
    { option: "", isCorrect: false, id: 4 },
  ]);

  const [quiz, setQuiz] = useState({
    question: "",
    options: ans,
    answer: "",
  });

  const handleQuiz = (event) => {
    event.preventDefault();
    // console.log(ans, "ans");
    console.log(quiz);
    // dispatch(quizSuccess(quiz));
  };

  const handleType = (id) => (event) => {
    const { name, value } = event.target;
    setAns((prev) =>
      ans?.map((item) =>
        item.id === id
          ? { ...item, [name]: value === "true" ? true : value }
          : item
      )
    );
    setQuiz({ ...quiz, options: ans });
  };

  console.log(ans);

  return (
    <div className="w-10/12 flex text-slate-50 justify-center">
      <div className="">
        <div className="flex text-yellow-500  w-96 font-bold font-serif mb-2 ml-12 mt-14">
          <h1 className="text-2xl ">ADD QUESTIONS </h1>
        </div>
        <form className="mt-6">
          <label
            className="block uppercase tracking-wide text-xs font-bold mb-2 text-black"
            htmlFor="question"
          >
            Question{" "}
          </label>
          <input
            className=" block w-full bg-gray-200 text-gray-700 border rounded py-2 px-4 mb-3 leading-tight focus:outline-none focus:bg-white"
            id="question"
            type="text"
            name="question"
            placeholder="Question"
            value={quiz.question}
            onChange={(event) =>
              setQuiz({ ...quiz, questions: event.target.value })
            }
          />
          <label
            className="block uppercase tracking-wide  text-xs font-bold mb-2 text-black"
            htmlFor="grid-first-name"
          >
            Options
          </label>
          <div className="">
            {ans?.map((x) => {
              return (
                <div key={x.id} className="flex  gap-1 ">
                  <input
                    className="w-1/2 block  bg-gray-200 text-gray-700 border rounded py-2 px-4 mb-3 leading-tight focus:outline-none focus:bg-white"
                    type="text"
                    placeholder={`Option ${x.id}`}
                    name="option"
                    value={x.option}
                    onChange={(e) => {
                      handleType(x.id)(e);
                    }}
                  />
                  <select
                    className="form-select appearance-none
                  block
                  w-1/2
                  px-3
                h-9
                  text-base
                  font-normal
                  text-gray-700
                  bg-white bg-clip-padding bg-no-repeat
                  border border-solid border-gray-300
                  rounded
                  transition
                  ease-in-out
                  m-0
                  focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none"
                    name="isCorrect"
                    id=""
                    v-model="allowMultiple"
                    value={x.boolean}
                    onChange={(e) => {
                      handleType(x.id)(e);
                    }}
                  >
                    <option value="">Select the value</option>
                    <option value={true}>true</option>
                  </select>
                </div>
              );
            })}
          </div>
          <label
            className="block uppercase tracking-wide  text-xs font-bold mb-2 text-black"
            htmlFor="grid-first-name"
          >
            Answer{" "}
          </label>
          <input
            className=" block w-full bg-gray-200 text-gray-700 border rounded py-2 px-4 mb-3 leading-tight focus:outline-none focus:bg-white"
            id="grid-first-name"
            type="text"
            placeholder="Answer"
            name="answer"
            value={quiz.answer}
            onChange={(event) =>
              setQuiz({ ...quiz, answer: event.target.value })
            }
          />
          <div className="flex">
            <button
              onClick={handleQuiz}
              className=" bg-transparent hover:bg-blue-500 text-blue-700 font-semibold hover:text-white py-2 px-4 border border-blue-500 hover:border-transparent rounded ml-auto "
            >
              Submit
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};
