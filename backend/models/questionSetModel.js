import mongoose from "mongoose";
import { questionSchema } from "./questionModel.js";
const { Schema, model } = mongoose;

const questionSetSchema = new Schema(
  {
    questionSet: {
      type: [questionSchema],
      validate: {
        validator: function (value) {
          return value.length === 12;
        },
        message: "Question set must be 12.",
      },
    },
  },
  {
    timestamps: true,
  }
);

const QuestionSet = model("QuestionSet", questionSetSchema);
export default QuestionSet;
