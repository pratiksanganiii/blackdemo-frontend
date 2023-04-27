import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import rootService from "./rootService";

const initialState = {
  appLoading: true,
  error: "",
};

export const initializeApp: any = createAsyncThunk(
  "root/initializeApp",
  async (_d, thunkAPI) => {
    rootService.initializeApp();
    try {
      return await rootService.testAPIStatus();
    } catch (error) {
      return thunkAPI.rejectWithValue("Network Issue.");
    }
  }
);

export const rootSlice = createSlice({
  name: "root",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(initializeApp.pending, (state) => {
        state.appLoading = true;
      })
      .addCase(initializeApp.fulfilled, (state) => {
        state.appLoading = false;
      })
      .addCase(initializeApp.rejected, (state, action) => {
        state.appLoading = false;
        state.error = action.payload;
      });
  },
});
const rootReducer = rootSlice.reducer;
export default rootReducer;
