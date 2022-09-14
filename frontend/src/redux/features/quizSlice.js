import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import * as api from "../api";

export const allQuiz = createAsyncThunk(
  "quiz/all",
  async (_, { rejectWithValue }) => {
    try {
      const { data } = await api.allQuiz();
      return data;
    } catch (error) {
      return rejectWithValue(error.message);
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
      return rejectWithValue(error.message);
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
      return rejectWithValue(error.message);
    }
  }
);

const quizSlice = createSlice({
  name: "quiz",
  initialState: {
    quiz: [],
    quizzes: [],
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
  },
});

export default quizSlice.reducer;
