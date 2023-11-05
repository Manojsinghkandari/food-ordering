import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

const initialState = {
  loading: false,
  Contents: [],
};

const URL = "http://localhost:3001";

export const getAllContent = createAsyncThunk(
  "content/getAllContent",
  async () => {
    try {
      const token = JSON.parse(localStorage.getItem("user"))?.token;
      const options = {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      };
      const response = await axios.get(
        `${URL}/contents/getAllContent`,
        options
      );
      console.log(response.data);
      return response.data;
    } catch (error) {
      console.log(error);
    }
  }
);

const contentSlice = createSlice({
  name: "contentSlice",
  initialState,
  extraReducers: (builder) => {
    builder
      .addCase(getAllContent.pending, (state) => {
        state.loading = true;
      })
      .addCase(getAllContent.fulfilled, (state, action) => {
        state.loading = false;
        state.Contents = action.payload;
      });
  },
});

export default contentSlice.reducer;
