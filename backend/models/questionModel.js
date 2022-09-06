import mongoose from "mongoose";
import { AnswerOption } from "./schemas.js";
const { Schema, model } = mongoose;

export const questionSchema = new Schema({
  question: {
    type: String,
    minlength: 10,
    maxlength: 1000,
  },
  options: {
    type: [AnswerOption],
    default: undefined,
    validate: {
      validator: function (value) {
        return value && value.length === 4;
      },
      message: "Answer options should be 4.",
    },
  },
  quizId: {
    type: Schema.Types.ObjectId,
    ref: "Quiz",
  },
  answer: {
    type: String,
    minlength: 1,
    maxlength: 200,
  },
});

const Question = model("Question", questionSchema);
export default Question;
