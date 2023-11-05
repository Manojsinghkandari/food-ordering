import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { getAllContent } from "./ContentSilce";
import axios from "axios";

const initialState = {
  loading: false,
};

const URL = "http://localhost:3001";

export const createContent = createAsyncThunk(
  "/admin/createContent",
  async ({ contentObj, token }, thunkapi) => {
    const options = {
      headers: {
        "Content-Type": "multipart/form-data",
        Authorization: `Bearer ${token}`,
      },
    };
    try {
      const response = await axios.post(
        `${URL}/contents/upload`,
        contentObj,
        options
      );
      console.log(response.data);
      if (response.status === 200) {
        thunkapi.dispatch(getAllContent());
      }
    } catch (error) {
      console.log(error);
    }
  }
);

export const Deletecontent = createAsyncThunk(
  "/admin/Deletecontent",
  async ({ id }, thunkapi) => {
    console.log(id);
    const token = JSON.parse(localStorage.getItem("user"))?.token;
    const options = {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    };

    try {
      const response = await axios.delete(`${URL}/contents/${id}`, options);
      console.log(response.data);
      if (response.status === 200) {
        thunkapi.dispatch(getAllContent());
      }
    } catch (error) {
      console.log(error);
    }
  }
);

export const UpdateContent = createAsyncThunk(
  "/admin/Updatecontent",
  async ({ id, updateddata }, thunkapi) => {
    console.log(id);
    const token = JSON.parse(localStorage.getItem("user"))?.token;
    const options = {
      headers: {
        "Content-Type": "multipart/form-data",
        Authorization: `Bearer ${token}`,
      },
    };

    try {
      const response = await axios.put(
        `${URL}/contents/update/${id}`,
        updateddata,
        options
      );
      console.log(response.data);
      if (response.status === 200) {
        thunkapi.dispatch(getAllContent());
      }
    } catch (error) {
      console.log(error);
    }
  }
);

const adminSlice = createSlice({
  name: "adminSlice",
  initialState,
  extraReducers: (builder) => {
    builder
      .addCase(createContent.pending, (state, action) => {
        state.loading = true;
      })
      .addCase(createContent.fulfilled, (state, action) => {
        state.loading = false;
      })
      .addCase(Deletecontent.pending, (state, action) => {
        state.loading = true;
      })
      .addCase(Deletecontent.fulfilled, (state, action) => {
        state.loading = false;
      })
      .addCase(UpdateContent.pending, (state, action) => {
        state.loading = true;
      })
      .addCase(UpdateContent.fulfilled, (state, action) => {
        state.loading = false;
      });
  },
});

export default adminSlice.reducer;
