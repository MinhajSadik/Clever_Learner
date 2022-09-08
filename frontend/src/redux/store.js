import { configureStore } from "@reduxjs/toolkit";
import QuestionReducer from "./features/questionSlice";
import QuizReducer from "./features/quizSlice";
import UserReducer from "./features/userSlice";

export const store = configureStore({
  reducer: {
    user: UserReducer,
    quiz: QuizReducer,
    question: QuestionReducer,
  },
});
