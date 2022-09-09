import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { addQuiz } from "../../redux/features/quizSlice";
import classes from "../../styles/AddQuiz.module.css";

export const AddQuiz = ({ id }) => {
  const dispatch = useDispatch();
  const [imagePreview, setImagePreview] = useState("/imagePreview.png");
  const [image, setImage] = useState("/imagePreview.png");
  const initialState = {
    name: "",
    description: "",
    price: "",
    duration: "",
    answerType: "",
    image: image,
  };

  const [quizInfo, setQuizInfo] = useState(initialState);

  const { name, description, price, duration, answerType } = quizInfo;
  console.log(quizInfo);
  const onInputChange = (e) => {
    const { name, value } = e.target;

    setQuizInfo({ ...quizInfo, [name]: value });
  };

  const quizImageUpload = (e) => {
    const reader = new FileReader();
    reader.onload = () => {
      if (reader.readyState === 2) {
        setImagePreview(reader.result);
        setImage(reader.result);
      }
    };
    reader.readAsDataURL(e.target.files[0]);
  };

  const submitQuiz = (e) => {
    const quizData = new FormData();

    quizData.set("name", name);
    quizData.set("description", description);
    quizData.set("price", price);
    quizData.set("image", image);
    quizData.set("duration", duration);
    quizData.set("answerType", answerType);

    dispatch(addQuiz(quizData));
  };

  return (
    <div className="w-10/12 flex  text-slate-50 justify-center">
      <div className="">
        <div className="flex text-yellow-500  w-96 font-bold font-serif mb-2 ml-12 mt-14">
          <h1 className="text-2xl ">ADD QUIZ </h1>
        </div>
        <form className="mt-6">
          <label
            className="block uppercase tracking-wide text-xs font-bold mb-2 text-black"
            htmlFor="name"
          >
            Name{" "}
          </label>
          <input
            className=" block w-full bg-gray-200 text-gray-700 border rounded py-2 px-4 mb-3 leading-tight focus:outline-none focus:bg-white"
            id="name"
            type="text"
            placeholder="Name"
            value={name}
            name="name"
            onChange={onInputChange}
          />

          <label
            className="block uppercase tracking-wide  text-xs font-bold mb-2 text-black"
            htmlFor="description"
          >
            Description
          </label>
          <input
            className=" block w-full bg-gray-200 text-gray-700 border rounded py-2 px-4 mb-3 leading-tight focus:outline-none focus:bg-white"
            id="description"
            type="text"
            placeholder="Description"
            value={description}
            name="description"
            onChange={onInputChange}
          />
          <label
            className="block uppercase tracking-wide  text-xs font-bold mb-2 text-black"
            htmlFor="price"
          >
            Price
          </label>
          <input
            className=" block w-full bg-gray-200 text-gray-700 border rounded py-2 px-4 mb-3 leading-tight focus:outline-none focus:bg-white"
            id="price"
            type="text"
            placeholder="Price"
            value={price}
            name="price"
            onChange={onInputChange}
          />
          <div className="flex  gap-1 ">
            <input
              className="w-1/2 block  bg-gray-200 text-gray-700 border rounded py-2 px-4 mb-3 leading-tight focus:outline-none focus:bg-white"
              type="text"
              placeholder="Quiz Time Duration"
              disabled
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
              name="duration"
              id="duration"
              v-model="allowMultiple"
              value={duration}
              onChange={onInputChange}
            >
              <option value="">Select One</option>
              <option value="question_based">Question Based</option>
              <option value="quiz_based">Quiz Based</option>
            </select>
          </div>
          <div className="flex gap-1 ">
            <input
              className="w-1/2 block  bg-gray-200 text-gray-700 border rounded py-2 px-4 mb-3 leading-tight focus:outline-none focus:bg-white"
              type="text"
              placeholder="Answer Showing Option"
              disabled
              name="answerType"
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
              name="answerType"
              id="answerType"
              v-model="allowMultiple"
              value={answerType}
              onChange={onInputChange}
            >
              <option value="">Select One</option>
              <option value="question_based">Question Based</option>
              <option value="quiz_based">Quiz Based</option>
            </select>
          </div>
          <div className={classes.uploadImage}>
            <img src={imagePreview} alt="quizImage" />
            <input
              type="file"
              className="w-1/2 block  bg-gray-200 text-gray-700 border rounded py-2 px-4 mb-3 leading-tight focus:outline-none focus:bg-white"
              required
              name="image"
              accept="image/*"
              onChange={quizImageUpload}
            />
          </div>
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
