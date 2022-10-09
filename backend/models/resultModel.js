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
      default: 0,
    },
    isPassed: {
      type: Boolean,
      default: false,
    },
  },
  {
    timestamps: true,
  }
);

const Result = model("Result", resultSchema);
export default Result;
