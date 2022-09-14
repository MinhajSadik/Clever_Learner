import { Link } from "react-router-dom";
import classes from "../../styles/Quiz.module.css";
const Quiz = ({ quiz }) => {
  return (
    <div className="w-80">
      {quiz.quizzes.length ? (
        <div className="">
          <Link to={`/quiz/${quiz._id}`}>
            <img src={quiz.image?.url} alt={quiz.name} />
            <p>#️⃣ {quiz.name}</p>
            <p>#️⃣ {quiz.description}</p>
            <div className="">
              <p>{quiz.quizzes.length} Questions</p>
              <p>Price : {quiz.price}</p>
            </div>
            <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded ">
              Enroll
            </button>
          </Link>
        </div>
      ) : (
        <div className="">
          <Link to={`/quiz/${quiz._id}`}>
            <img src={quiz.image?.url} alt={quiz.name} />
            <p>#️⃣ {quiz.name}</p>
            <p>#️⃣ {quiz.description}</p>
            <div className={classes.meta}>
              <p>{quiz.quizzes.length} Questions</p>
              <p>Price : {quiz.price}</p>
            </div>
          </Link>
        </div>
      )}
    </div>
  );
};

export default Quiz;
