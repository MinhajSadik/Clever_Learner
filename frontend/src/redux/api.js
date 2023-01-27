import axios from "axios";

const devEnv = process.env.NODE_ENV === "development";

const { REACT_APP_DEV_API, REACT_APP_PROD_API } = process.env;

const API = axios.create({
  // baseURL: `${devEnv ? REACT_APP_DEV_API : REACT_APP_PROD_API}`,
  baseURL: REACT_APP_DEV_API,
  withCredentials: true,
});


export const loginUser = (loginInfo) => API.post("/api/user/login", loginInfo);
export const registerUser = (registerInfo) =>
  API.post("/api/user/register", registerInfo);

export const addQuiz = (quizData) => API.post(`/api/quiz/add`, quizData);
export const addQuestion = (questionInfo) =>
  API.post(`/api/question/add`, questionInfo);

export const allQuiz = () => API.get("/api/quiz/all");

export const quizById = (id) => API.get(`/api/quiz/${id}`);

export const allQuestion = () => API.get("/api/question/all");
