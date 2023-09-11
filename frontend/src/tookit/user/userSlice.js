import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

export const userSlice = createSlice({
  name: "user",
  initialState: {
    user: null,
    message: "",
    status: false,
  },
  reducers: {
    setUser: (state, { payload }) => {
      state.user = payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(getUser.fulfilled, (state, action) => {
        state.user = action.payload.user;
      })
      .addCase(logout.fulfilled, (state, action) => {
        state.user = null;
        state.message = action.payload.message;
      })
      .addCase(changePassword.fulfilled, (state, action) => {
        state.message = action?.payload?.message;
      });
  },
});

// thunk action creator
/**
  => user/getUser/pending
  => user/getUser/fullfiled
  => user/getUser/rejected
 */

export const getUser = createAsyncThunk("user/getUser", async () => {
  const res = await axios.get("/user/getUser");
  return res.data;
});

export const logout = createAsyncThunk("user/logout", async () => {
  const res = await axios.get("/user/logout");
  return res.data;
});

export const changePassword = createAsyncThunk(
  "user/changePassword",
  async ({ oldPassword, newPassword }) => {
    try {
      const res = await axios.patch("/user/changePassword", {
        oldPassword,
        newPassword,
      });
      return res.data;
    } catch {}
  },
);

export default userSlice;
