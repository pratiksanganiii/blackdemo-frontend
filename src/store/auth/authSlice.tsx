import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import authService from "./authService";
import { LoginPayloadProps } from "./authTypes";

// Get user from localStorage
const userFromLocalStorage = localStorage.getItem("user");

const initialState = {
  user: userFromLocalStorage ? JSON.parse(userFromLocalStorage) : null,
  isError: false,
  isSuccess: false,
  isLoading: false,
  message: "",
};

export const login: any = createAsyncThunk(
  "auth/login",
  async (loginPayload: LoginPayloadProps, thunkAPI) => {
    try {
      return await authService.login(loginPayload);
    } catch (error: any) {
      const message =
        (error.response &&
          error.response.data &&
          error.response.data.message) ||
        error.message ||
        error.toString();
      thunkAPI.rejectWithValue(message);
    }
  }
);

export const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    reset: (state) => {
      state.isLoading = false;
      state.isSuccess = false;
      state.isError = false;
      state.message = "";
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(login.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(login.fulfilled, (state, action) => {
        state.isError = false;
        state.isLoading = false;
        state.isSuccess = true;
        state.message = "Logged in.";
        state.user = action.payload;
      });
  },
});
const authReducer = authSlice.reducer;
export default authReducer;
