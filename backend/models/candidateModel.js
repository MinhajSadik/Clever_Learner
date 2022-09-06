const { Schema, model } = mongoose;
const mongoose = require("mongoose");

export const candidateSchema = new Schema(
  {
    name: String,
    email: String,
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
    candidateQuestionAnswers: {
      type: [Schema.Types.ObjectId],
      ref: "CandidateAnswer",
    },
  },
  {
    timestamps: true,
  }
);

const Candidate = model("Candidate", candidateSchema);
export default Candidate;
