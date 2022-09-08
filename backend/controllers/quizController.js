// import cloudinary from "cloudinary";
import Quiz from "../models/quizModel.js";
import ErrorHandler from "../utils/errorHandler.js";

const quizController = {
  addQuiz: async (req, res) => {
    try {
      const { name, description, image, price } = req.body;

      // const myCloud = await cloudinary.v2.uploader.upload(image, {
      //   folder: "quiz",
      // });

      const quiz = await Quiz.create({
        name,
        description,
        price,
        // image: {
        //   public_id: myCloud.public_id,
        //   url: myCloud.secure_url,
        // },
      });

      return res.status(201).json(quiz);
    } catch (error) {
      return res.status(500).json({
        status: false,
        message: error.message,
      });
    }
  },
  allQuiz: async (req, res, next) => {
    try {
      const quizzes = await Quiz.find({})
        .populate({
          path: "quizzes",
        })
        .sort({ createdAt: -1 });
      if (!quizzes) {
        next(new ErrorHandler("There are no quizzes available", 404));
      }
      return res.status(200).json(quizzes);
    } catch (error) {
      return res.status(500).json({
        status: false,
        message: error.message,
      });
    }
  },
  quizById: async (req, res, next) => {
    const { id } = req.params;
    try {
      const quiz = await Quiz.findById(id).populate({
        path: "quizzes",
      });

      if (!quiz) {
        return next(new ErrorHandler(`There are no quiz available ${id}`, 404));
      }

      return res.status(200).json(quiz);
    } catch (error) {
      return res.status(500).json({
        status: false,
        message: error.message,
      });
    }
  },
};

export default quizController;
