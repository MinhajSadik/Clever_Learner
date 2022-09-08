import Question from "../models/questionModel.js";
import Quiz from "../models/quizModel.js";
import ErrorHandler from "../utils/errorHandler.js";

const questionController = {
  addQuestion: async (req, res) => {
    try {
      const { question, options, answer, quizId } = req.body;
      const quiz = await Quiz.findById(quizId);

      const newQuestion = await Question.create({
        question,
        options,
        quizId,
        answer,
      });

      const savedQuestion = await newQuestion.save();
      await quiz.quizzes.push(savedQuestion._id);
      await quiz.save();

      return res.status(201).json(savedQuestion);
    } catch (error) {
      return res.status(500).json({
        status: false,
        message: error.message,
      });
    }
  },
  allQuestion: async (req, res, next) => {
    try {
      const questions = await Question.find({}).sort({ createdAt: -1 });

      if (!questions) {
        next(new ErrorHandler("There are no questions available", 404));
      }

      return res.status(200).json(questions);
    } catch (error) {
      return res.status(500).json({
        status: false,
        message: error.message,
      });
    }
  },
  questionById: async (req, res, next) => {
    const { id } = req.params;
    try {
      const question = await Question.findById(id);

      if (!question) {
        return next(
          new ErrorHandler(`There are no question available ${id}`, 404)
        );
      }

      return res.status(200).json(question);
    } catch (error) {
      return res.status(500).json({
        status: false,
        message: error.message,
      });
    }
  },
};

export default questionController;