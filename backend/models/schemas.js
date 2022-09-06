import mongoose from "mongoose";
const { Schema } = mongoose;

export const AnswerOption = new Schema(
  {
    option: {
      type: String,
      required: true,
    },
  },
  {
    _id: false,
  }
);

export const OptionSchema = new Schema({
  option: {
    type: String,
    required: true,
  },
});

export const QuestionSchema = new Schema(
  {
    question: {
      type: String,
      required: true,
    },
    answers: [OptionSchema],

    answer: {
      type: Number,
      required: true,
    },

    isEnabled: {
      type: Boolean,
      default: true,
    },

    explanation: {
      type: String,
      default: "",
    },
  },
  {
    timestamps: true,
  }
);

export const questionArr = new mongoose.Schema({
  title: {
    type: String,
  },
  questions: {
    type: String,
  },
  options: [
    {
      option: String,
      isCorrect: Boolean,
      id: Number,
    },
  ],
  correctAnswer: {
    type: String,
  },
});
