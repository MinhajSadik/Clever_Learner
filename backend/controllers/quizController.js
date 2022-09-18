import cloudinary from "cloudinary";
import Quiz from "../models/quizModel.js";
import ErrorHandler from "../utils/errorHandler.js";

//using class for quiz controller instance
class QuizController {
  async addQuiz(req, res) {
    try {
      const { name, description, image, price, duration, answerType } =
        req.body;

      const myCloud = await cloudinary.v2.uploader.upload(image, {
        folder: "quiz",
        width: 150,
        crop: "scale",
      });

      const quiz = await Quiz.create({
        name,
        description,
        price,
        image: {
          public_id: myCloud.public_id,
          url: myCloud.secure_url,
        },
        duration,
        answerType,
      });

      return res.status(201).json(quiz);
    } catch (error) {
      return res.status(500).json({
        status: false,
        message: error.message,
      });
    }
  }

  async allQuiz(req, res, next) {
    try {
      const quizzes = await Quiz.find({})
        .populate("quizId")
        .sort({ createdAt: -1 });

      if (quizzes.length === 0) {
        next(new ErrorHandler("There are no quizzes available", 404));
      }
      return res.status(200).json(quizzes);
    } catch (error) {
      return res.status(500).json({
        status: false,
        message: error.message,
      });
    }
  }

  async quizById(req, res, next) {
    const { id } = req.params;
    try {
      const quiz = await Quiz.findById(id)
        .populate("questions")
        .sort({ createdAt: -1 });

      if (quiz.length === 0) {
        return next(new ErrorHandler(`There are no quiz available ${id}`, 404));
      }

      return res.status(200).json(quiz);
    } catch (error) {
      return res.status(500).json({
        status: false,
        message: error.message,
      });
    }
  }
}

export default new QuizController();
