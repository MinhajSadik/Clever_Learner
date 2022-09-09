import mongoose from "mongoose";
const { Schema, model } = mongoose;

const quizSchema = new Schema(
  {
    name: {
      type: String,
      required: true,
      trim: true,
    },
    description: {
      type: String,
      required: true,
      trim: true,
    },
    image: {
      public_id: {
        type: String,
        required: true,
      },
      url: {
        type: String,
        required: true,
      },
    },
    price: {
      type: String,
      default: "free",
      enum: ["free", "paid"],
    },
    quizzes: [
      {
        type: Schema.Types.ObjectId,
        ref: "Question",
      },
    ],
    duration: {
      type: String,
      default: "question_based",
      enum: ["question_based", "quiz_based"],
    },
    answerType: {
      type: String,
      default: "question_based",
      enum: ["question_based", "quiz_based"],
    },
  },
  {
    timestamps: true,
  }
);

const Quiz = model("Quiz", quizSchema);

export default Quiz;
