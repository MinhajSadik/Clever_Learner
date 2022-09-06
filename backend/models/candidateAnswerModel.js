import mongoose from "mongoose";
const { Schema, model } = mongoose;

export const candidateAnswerSchema = new Schema(
  {
    candidate: {
      type: Schema.Types.ObjectId,
      ref: "Candidate",
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
  },
  {
    timestamps: true,
  }
);

candidateAnswerSchema.pre("save", function updateTotalScore(next) {
  // update total score of the candidate here, based on the correct questionAnswers and
  // questionSet.
  next();
});

candidateAnswerSchema.pre("save", function updateIsPassed(next) {
  // update the isPassed based on the totalScore obtained by the candidate.
  next();
});

const CandidateAnswer = model("CandidateAnswer", candidateAnswerSchema);
export default CandidateAnswer;
