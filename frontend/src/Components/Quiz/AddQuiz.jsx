import React from "react";

export const AddQuiz = ({ id }) => {
  const submitQuiz = () => {};
  console.log(id);
  return (
    <div className="w-10/12 flex  text-slate-50 justify-center">
      <div className="">
        <div className="flex text-yellow-500  w-96 font-bold font-serif mb-2 ml-12 mt-14">
          <h1 className="text-2xl ">ADD QUIZ </h1>
        </div>
        <form className="mt-6">
          <label
            className="block uppercase tracking-wide text-xs font-bold mb-2 text-black"
            htmlFor="grid-first-name"
          >
            Name{" "}
          </label>
          <input
            className=" block w-full bg-gray-200 text-gray-700 border rounded py-2 px-4 mb-3 leading-tight focus:outline-none focus:bg-white"
            id="grid-first-name"
            type="text"
            placeholder="Name"
            // onChange={(event) => setQuiz({ ...quiz, questions: event.target.value }) }
          />

          <label
            className="block uppercase tracking-wide  text-xs font-bold mb-2 text-black"
            htmlFor="grid-first-name"
          >
            Description
          </label>
          <input
            className=" block w-full bg-gray-200 text-gray-700 border rounded py-2 px-4 mb-3 leading-tight focus:outline-none focus:bg-white"
            id="grid-first-name"
            type="text"
            placeholder="Description"
            // onChange={(event) => setQuiz({ ...quiz, correctAnswer: event.target.value })}
          />
          <label
            className="block uppercase tracking-wide  text-xs font-bold mb-2 text-black"
            htmlFor="grid-first-name"
          >
            Price
          </label>
          <input
            className=" block w-full bg-gray-200 text-gray-700 border rounded py-2 px-4 mb-3 leading-tight focus:outline-none focus:bg-white"
            id="grid-first-name"
            type="text"
            placeholder="Price"
            // onChange={(event) => setQuiz({ ...quiz, correctAnswer: event.target.value })}
          />
          <div className="flex">
            <button
              onClick={submitQuiz}
              className="bg-transparent hover:bg-blue-500 text-blue-700 font-semibold hover:text-white py-2 px-4 border border-blue-500 hover:border-transparent rounded ml-auto"
            >
              Submit
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};
