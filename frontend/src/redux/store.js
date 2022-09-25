import { configureStore } from "@reduxjs/toolkit";
import QuizReducer from "./features/quizSlice";
import UserReducer from "./features/userSlice";

export const store = configureStore({
  reducer: {
    user: UserReducer,
    quiz: QuizReducer,
  },
});
