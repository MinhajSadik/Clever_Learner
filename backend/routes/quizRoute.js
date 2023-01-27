import { Router } from "express";
import quizController from "../controllers/quizController.js";
import { authorizeRoles, checkAuth } from "../middlewares/checkAuth.js";

const router = Router();

router.post("/add", checkAuth, authorizeRoles("admin"), quizController.addQuiz);
router.get("/all", checkAuth, quizController.allQuiz);
router.get("/:id", quizController.quizById);
router.post("/result", quizController.submitResult);

export default router;
