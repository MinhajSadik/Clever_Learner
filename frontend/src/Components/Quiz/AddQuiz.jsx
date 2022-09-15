import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { addQuiz } from "../../redux/features/quizSlice";
// import classes from "../../styles/AddQuiz.module.css";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import Modal from "react-bootstrap/Modal";

const AddQuiz = ({ id }) => {
  const navigate = useNavigate();
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
    navigate("/");
  };

  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
  return (
    <div className="">
      <Button className=" bg-purple-600 rounded-sm" onClick={handleShow}>
        Add Quiz
      </Button>

      <Modal show={show} onHide={handleClose}>
        <Modal.Header>
          <Modal.Title>
            {" "}
            Upload a interesting quiz for your visitors
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            <Form.Group className="mb-3">
              <Form.Label>A Short Name!</Form.Label>
              <Form.Control
                autoFocus
                id="name"
                type="text"
                placeholder="What is the type or name of quiz"
                value={name}
                name="name"
                onChange={onInputChange}
              />
            </Form.Group>

            <Form.Group className="mb-3">
              <Form.Label>A Short Description</Form.Label>
              <Form.Control
                type="description"
                name="description"
                autoFocus
                placeholder="What would be quiz's best description, describe a short description and key point"
                value={description}
                onChange={onInputChange}
                id="description"
                as="textarea"
                rows={2}
              />
            </Form.Group>

            <Form.Group className="mb-3">
              <Form.Label>How much Cost?</Form.Label>
              <Form.Control
                id="price"
                type="text"
                placeholder="How much cost you will define for quiz. e.g: paid, free, 0.0"
                value={price}
                name="price"
                onChange={onInputChange}
                autoFocus
              />
            </Form.Group>

            <Form.Group className="mb-3">
              <Form.Label>What would be the Quiz time duration?</Form.Label>
              <Form.Control
                as="select"
                id="duration"
                type="text"
                name="duration"
                value={duration}
                onChange={onInputChange}
              >
                <option value="">Choose Quis Duration</option>
                <option value="quiz_based">Quiz Based</option>
                <option value="question_based">Question Based</option>
              </Form.Control>
            </Form.Group>

            <Form.Group className="mb-3">
              <Form.Label>
                What would be the quiz answer showing option?
              </Form.Label>
              <Form.Control
                as="select"
                id="answerType"
                type="text"
                name="answerType"
                value={answerType}
                onChange={onInputChange}
              >
                <option value="">Choose Quis Answer Option</option>
                <option value="quiz_based">Quiz Based</option>
                <option value="question_based">Question Based</option>
              </Form.Control>
            </Form.Group>

            <Form.Group className="mb-3">
              <Form.Label>
                What would be the quiz answer showing option?
              </Form.Label>
              <Form.Control
                type="file"
                required
                name="image"
                accept="image/*"
                onChange={quizImageUpload}
              />
            </Form.Group>
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button onClick={handleClose}>Close</Button>
          <Button onClick={submitQuiz}>Submit Quiz</Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
};

export default AddQuiz;
