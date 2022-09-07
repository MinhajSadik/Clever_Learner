import { Link } from "react-router-dom";

const Quiz = ({ quiz }) => {
  return (
    <div className="flex">
      <div>
        <Link to={quiz._id}>
          <p>{quiz.name}</p>
        </Link>
      </div>
    </div>
  );
};

export default Quiz;
