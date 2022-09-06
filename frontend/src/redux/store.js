import { configureStore } from "@reduxjs/toolkit";
import UserReducer from "./features/userSlice";
import QuizReducer from "./features/quizSlice";

export const store = configureStore({
  reducer: {
    user: UserReducer,
    quiz: QuizReducer,
  },
});
