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

router.get("/all", questionController.allQuestion);
router.get("/:id", questionController.questionById);

export default router;
