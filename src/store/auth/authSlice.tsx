import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import authService from "./authService";
import { LoginPayloadProps, RegisterPayloadProps } from "./authTypes";

// Get user from localStorage
const userFromLocalStorage = localStorage.getItem("user");

const initialState = {
  token: localStorage.getItem("token"),
  user: userFromLocalStorage ? JSON.parse(userFromLocalStorage) : null,
  isError: false,
  isSuccess: false,
  isLoading: false,
  message: "",
  errors: [],
};

export const login = createAsyncThunk(
  "auth/login",
  async (loginPayload: LoginPayloadProps, thunkAPI) => {
    try {
      return await authService.login(loginPayload);
    } catch (error: any) {
      const errors: any[] = error.data.error ?? "";
      return thunkAPI.rejectWithValue(errors);
    }
  }
);

export const register = createAsyncThunk(
  "auth/register",
  async (registerPayload: RegisterPayloadProps, thunkAPI) => {
    try {
      return await authService.register(registerPayload);
    } catch (error: any) {
      const errors: any[] = error.data.error ?? "";
      return thunkAPI.rejectWithValue(errors);
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
      state.errors = [];
    },
    resetFormErrors: (state) => {
      state.errors = [];
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
        state.user = action.payload.user;
        state.token = action.payload.user.token;
      })
      .addCase(login.rejected, (state, action: any) => {
        state.isError = true;
        state.isLoading = false;
        state.errors = action.payload;
      })
      .addCase(register.pending, (state) => {
        state.isError = false;
        state.isLoading = true;
        state.message = "";
      })
      .addCase(register.rejected, (state, action: any) => {
        state.isError = true;
        state.isLoading = false;
        state.errors = action.payload;
      })
      .addCase(register.fulfilled, (state, action) => {
        state.isError = false;
        state.isLoading = false;
        state.isSuccess = true;
        state.message = "Logged in.";
        state.user = action.payload.user;
        state.token = action.payload.user.token;
      });
  },
});
export const { reset, resetFormErrors } = authSlice.actions;
export default authSlice.reducer;
