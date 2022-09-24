import { Link } from "react-router-dom";
import classes from "../../styles/Quiz.module.css";

const Quiz = ({ quiz }) => {
  return (
    <Link
      // to={`${quiz.price === "free" ? `/quiz/${quiz._id}` : `/quiz/payment`}`}
      to={`/quiz/${quiz._id}`}
    >
      <div className={classes.quiz}>
        <img src={quiz.image?.url} alt={quiz.name} />
        <div className={classes.first}>
          <p className="">#️⃣ {quiz.name}</p>
          <p>#️⃣ {quiz.description}</p>
        </div>
        <div className={classes.second}>
          <p className=" shadow-sm bg-green-300 rounded-md p-1">
            {quiz.questions.length} Questions
          </p>
          <p className="text-uppercase uppercase shadow-sm m-1 text-center w-20 h-8 bg-blue-400 rounded-full p-1">
            ${quiz.price}
          </p>
        </div>
        <div className={classes.third}>
          <p className="shadow-sm uppercase bg-green-300 rounded-md p-1">
            {quiz.answerType}
          </p>

          <p className="shadow-sm uppercase bg-green-300 rounded-md p-1">
            {quiz.duration}
          </p>
        </div>
      </div>
    </Link>
  );
};

export default Quiz;
