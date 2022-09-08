import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

import * as api from "../api";

export const loginUser = createAsyncThunk(
  "user/login",
  async ({ loginInfo, navigate, toast }, { rejectWithValue }) => {
    try {
      const { data } = await api.loginUser(loginInfo);
      navigate("/");
      toast.success("Logged In Successed");
      return data;
    } catch (error) {
      toast.error(error);
      return rejectWithValue(error);
    }
  }
);

export const registerUser = createAsyncThunk(
  "user/register",
  async ({ registerInfo, navigate, toast }, { rejectWithValue }) => {
    try {
      const { data } = await api.registerUser(registerInfo);
      navigate("/");
      toast.success("Register Successed");
      return data;
    } catch (error) {
      toast.error(error);
      return rejectWithValue(error);
    }
  }
);

const userSlice = createSlice({
  name: "user",
  initialState: {
    user: {},
    users: [],
    error: "",
    loading: false,
    loggedIn: false,
  },
  reducers: {
    setUser: (state, action) => {
      state.user = action.payload;
      state.loggedIn = true;
    },
    logoutUser: (state) => {
      state.user = null;
      state.loggedIn = false;
      localStorage.removeItem("token");
    },
  },
  extraReducers: {
    [loginUser.pending]: (state) => {
      state.loading = true;
    },
    [loginUser.fulfilled]: (state, { payload }) => {
      state.loading = false;
      state.loggedIn = true;
      state.user = payload;
      localStorage.setItem("token", JSON.stringify({ ...payload }));
    },
    [loginUser.rejected]: (state, { payload }) => {
      state.loading = false;
      state.error = payload;
    },
    [registerUser.pending]: (state) => {
      state.loading = true;
    },
    [registerUser.fulfilled]: (state, { payload }) => {
      state.loading = false;
      state.loggedIn = true;
      state.user = payload;
      localStorage.setItem("token", JSON.stringify({ ...payload }));
    },
    [registerUser.rejected]: (state, { payload }) => {
      state.loading = false;
      state.error = payload;
    },
  },
});

export const { setUser, logoutUser } = userSlice.actions;

export default userSlice.reducer;
