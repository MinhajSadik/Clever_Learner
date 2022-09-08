import { Router } from "express";
import questionController from "../controllers/questionController.js";
import { authorizeRoles, checkAuth } from "../middlewares/checkAuth.js";

const router = Router();

router.post(
  "/add",
  checkAuth,
  authorizeRoles("admin"),
  questionController.addQuestion
);
router.get("/all", checkAuth, questionController.allQuestion);
router.get("/:id", checkAuth, questionController.questionById);

export default router;
