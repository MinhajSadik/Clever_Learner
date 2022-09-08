import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import * as api from "../api";

export const allQuestion = createAsyncThunk(
  "question/all",
  async (_, { rejectedWithValue }) => {
    try {
      const { data } = await api.allQuestion();
      return data;
    } catch (error) {
      return rejectedWithValue(error.message);
    }
  }
);

const questionSlice = createSlice({
  name: "question",
  initialState: {
    question: {},
    questions: [],
    loading: false,
    error: "",
  },

  reducers: {},
  extraReducers: {
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
  },
});

export default questionSlice.reducer;
