import mongoose from "mongoose";
const { Schema, model } = mongoose;

export const resultSchema = new Schema(
  {
    candidate: {
      type: Schema.Types.ObjectId,
      ref: "User",
    },
    question: {
      type: Schema.Types.ObjectId,
      ref: "Question",
    },
    questionAnswers: {
      type: [Number],
    },
    totalScore: {
      type: Number,
    },
    isPassed: {
      type: Boolean,
      default: false,
    },
    totalAttempt: {
      type: Number,
      default: 0,
      validate: {
        validator: function (value) {
          return value === 3;
        },
        message: "You have already done three attempts.",
      },
    },
  },
  {
    timestamps: true,
  }
);

const Result = model("Result", resultSchema);
export default Result;
