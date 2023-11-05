import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

const initialState = {
  loading: false,
  user: localStorage.getItem("user")
    ? JSON.parse(localStorage.getItem("user"))
    : null,
  isauthenticated: localStorage.getItem("user") ? true : false,
};

const URL = "http://localhost:3001/users";

export const registerUser = createAsyncThunk(
  "auth/registerUser",
  async (userInfo) => {
    console.log(userInfo);
    const resp = await axios.post(URL + "/signup", userInfo);
    delete resp?.data?.password;
    localStorage.setItem("user", JSON.stringify(resp?.data));
    return resp.data;
  }
);

export const loginUser = createAsyncThunk(
  "auth/loginUser",
  async (userInfo) => {
    console.log(userInfo);
    const resp = await axios.post(URL + "/login", userInfo);
    delete resp?.data?.user?.password;
    localStorage.setItem("user", JSON.stringify(resp?.data));
    return resp?.data?.user;
  }
);

const authSlice = createSlice({
  name: "authSlice",
  initialState,
  reducers: {
    logout: (state) => {
      localStorage.removeItem("user");
      state.isauthenticated = false;
      state.user = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(registerUser.pending, (state) => {
        state.loading = true;
      })
      .addCase(registerUser.fulfilled, (state, action) => {
        state.loading = false;
        state.user = action.payload;
        state.isauthenticated = true;
      })
      .addCase(loginUser.pending, (state) => {
        state.loading = true;
      })
      .addCase(loginUser.fulfilled, (state, action) => {
        state.loading = false;
        state.user = action.payload;
        state.isauthenticated = true;
      });
  },
});

export const { logout } = authSlice.actions;
export default authSlice.reducer;
