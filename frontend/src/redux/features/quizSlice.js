import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import * as api from "../api";

export const allQuiz = createAsyncThunk(
  "quiz/all",
  async (_, { rejectWithValue }) => {
    try {
      const { data } = await api.allQuiz();
      return data;
    } catch (error) {
      return rejectWithValue(error.response.data.message);
    }
  }
);

export const getQuizById = createAsyncThunk(
  "quiz/getById",
  async (id, { rejectWithValue }) => {
    try {
      const { data } = await api.quizById(id);
      return data;
    } catch (error) {
      return rejectWithValue(error.response.data.message);
    }
  }
);

export const addQuiz = createAsyncThunk(
  "quiz/add",
  async (quizData, { rejectWithValue }) => {
    try {
      const { data } = await api.addQuiz(quizData);
      return data;
    } catch (error) {
      return rejectWithValue(error.response.data.message);
    }
  }
);

export const allQuestion = createAsyncThunk(
  "question/all",
  async (_, { rejectWithValue }) => {
    try {
      const { data } = await api.allQuestion();
      return data;
    } catch (error) {
      return rejectWithValue(error.response.data.message);
    }
  }
);

export const addQuestion = createAsyncThunk(
  "question/add",
  async (questionInfo, { rejectWithValue }) => {
    try {
      const { data } = await api.addQuestion(questionInfo);
      return data;
    } catch (error) {
      return rejectWithValue(error.response.data.message);
    }
  }
);

const quizSlice = createSlice({
  name: "quiz",
  initialState: {
    quiz: [],
    quizzes: [],
    question: {},
    questions: [],
    error: "",
    loading: false,
  },
  reducers: {},
  extraReducers: {
    [allQuiz.pending]: (state) => {
      state.loading = true;
    },
    [allQuiz.fulfilled]: (state, { payload }) => {
      state.loading = false;
      state.quizzes = payload;
    },
    [allQuiz.rejected]: (state, { payload }) => {
      state.loading = false;
      state.error = payload;
    },
    [getQuizById.pending]: (state) => {
      state.loading = true;
    },
    [getQuizById.fulfilled]: (state, { payload }) => {
      state.loading = false;
      state.quiz = payload;
    },
    [getQuizById.rejected]: (state, { payload }) => {
      state.loading = false;
      state.error = payload;
    },
    [addQuiz.pending]: (state) => {
      state.loading = true;
    },
    [addQuiz.fulfilled]: (state, { payload }) => {
      state.loading = false;
      state.quizzes = [...state.quizzes, payload];
    },
    [addQuiz.rejected]: (state, { payload }) => {
      state.loading = false;
      state.error = payload;
    },
    [allQuestion.pending]: (state) => {
      state.loading = true;
    },
    [allQuestion.fulfilled]: (state, { payload }) => {
      state.loading = false;
      state.questions = payload;
    },
    [allQuestion.rejected]: (state, { payload }) => {
      state.error = payload;
    },
    [addQuestion.pending]: (state) => {
      state.loading = true;
    },
    [addQuestion.fulfilled]: (state, { payload }) => {
      state.loading = false;
      state.questions = [...state.questions, payload];
    },
    [addQuestion.rejected]: (state, { payload }) => {
      state.error = payload;
    },
  },
});

export default quizSlice.reducer;
