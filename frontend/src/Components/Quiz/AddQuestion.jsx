import React, { useState } from "react";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import Modal from "react-bootstrap/Modal";
import { useDispatch } from "react-redux";
import { addQuestion } from "../../redux/features/questionSlice";

export const AddQuestion = ({ id, quizId }) => {
  const dispatch = useDispatch();
  const [show, setShow] = useState(false);

  const [options, setOptions] = useState([
    { option: "", isCorrect: false, id: 1 },
    { option: "", isCorrect: false, id: 2 },
    { option: "", isCorrect: false, id: 3 },
    { option: "", isCorrect: false, id: 4 },
  ]);

  const [questionInfo, setQuestionInfo] = useState({
    question: "",
    options: options,
    answer: "",
    quizId,
  });

  const { question, answer } = questionInfo;

  const handleType = (id) => (e) => {
    const { name, value } = e.target;
    setOptions((prev) =>
      options?.map((item) =>
        item.id === id
          ? { ...item, [name]: value === "true" ? true : value }
          : item
      )
    );
    setQuestionInfo({ ...questionInfo, options: options });
  };

  const onInputChange = (e) => {
    const { name, value } = e.target;
    setQuestionInfo({ ...questionInfo, [name]: value });
  };

  const submitQuestion = (e) => {
    dispatch(addQuestion(questionInfo));
    handleClose(true);
  };
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  return (
    <div className="">
      <Button className=" bg-blue-700 rounded-sm" onClick={handleShow}>
        ADD Question
      </Button>

      <Modal show={show} onHide={handleClose}>
        <Modal.Header>
          <Modal.Title>Upload quiz-relevant questions for quiz. </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            <Form.Group className="mb-3">
              <Form.Label for="text">A Clear Question!</Form.Label>
              <Form.Control
                id="question"
                type="text"
                placeholder="What is your question?"
                name="question"
                value={question}
                onChange={onInputChange}
                autoFocus
              />
            </Form.Group>

            <Form.Group className="mb-3">
              <Form.Label for="text">Options</Form.Label>
              {options?.map((option) => {
                return (
                  <div key={option.id} className="flex  gap-1 ">
                    <input
                      className="w-1/2 block  bg-gray-200 text-gray-700 border rounded py-2 px-4 mb-3 leading-tight focus:outline-none focus:bg-white"
                      type="text"
                      placeholder={`Option ${option.id}`}
                      name="option"
                      value={option.option}
                      onChange={(e) => {
                        handleType(option.id)(e);
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
                   focus:bg-white focus:border-blue-600 focus:outline-none"
                      name="isCorrect"
                      id=""
                      v-model="allowMultiple"
                      value={option.isCorrect}
                      onChange={(e) => {
                        handleType(option.id)(e);
                      }}
                    >
                      <option value="">Select the value</option>
                      <option value={true}>true</option>
                      <option value={false}>false</option>
                    </select>
                  </div>
                );
              })}
            </Form.Group>

            <Form.Group className="mb-3">
              <Form.Label for="text">Write your Answer!</Form.Label>
              <Form.Control
                id="answer"
                type="text"
                placeholder="Make sure your answer is readable and easy to understand"
                name="answer"
                value={answer}
                onChange={onInputChange}
              />
            </Form.Group>
          </Form>
        </Modal.Body>
        <Modal.Footer className="text bg-blue-400">
          <Button onClick={handleClose}>Close</Button>
          <Button onClick={submitQuestion}>Submit Question</Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
};
