import { Router } from "express";
import quizController from "../controllers/quizController.js";

const router = Router();

router.post("/add", quizController.addQuiz);
router.get("/all", quizController.allQuiz);

export default router;
