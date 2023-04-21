import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import rootService from "./rootService";

const initialState = {
  appLoading: true,
};

export const initializeApp:any = createAsyncThunk("root/initializeApp", () => {
  rootService.initializeApp();
});

export const rootSlice = createSlice({
  name: "root",
  initialState,
  reducers: {
  },
  extraReducers: (builder) => {
    builder
      .addCase(initializeApp.pending, (state) => {
        state.appLoading = true;
      })
      .addCase(initializeApp.fulfilled, (state) => {
        state.appLoading = false;
      })
      .addCase(initializeApp.rejected, (state) => {
        state.appLoading = false;
      });
  },
});
const rootReducer = rootSlice.reducer;
export default rootReducer;
