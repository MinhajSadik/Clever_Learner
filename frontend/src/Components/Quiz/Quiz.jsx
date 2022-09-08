import { Link } from "react-router-dom";
import classes from "../../styles/Quiz.module.css";
const Quiz = ({ quiz }) => {
  return (
    <div className={classes.quiz}>
      <Link to={quiz._id}>
        <img src={quiz.image?.url} alt={quiz.name} />
        <p># {quiz.name}</p>
        <p>#{quiz.description}</p>
        <div className={classes.meta}>
          <p>{quiz.quizzes.length} Questions</p>
          <p>Price : {quiz.price}</p>
        </div>
      </Link>
    </div>
  );
};

export default Quiz;
