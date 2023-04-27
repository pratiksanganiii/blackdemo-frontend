import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { ChatStateInterface } from "./ChatTypes";
import chatActions from "./chatActions";

const initialState: ChatStateInterface = {
  socket: undefined,
  chats: [],
  loading: false,
  error: "",
};

export const createChatConnection = createAsyncThunk(
  "chat/createConnection",
  (userId:string, thunkAPI) => {
    try {
      return chatActions.createChatConnection(userId);
    } catch (error) {
      thunkAPI.rejectWithValue(error);
    }
  }
);

export const sendMessage = createAsyncThunk(
  "chat/sendMessage",
  (payload: any, thunkAPI) => {
    try {
      return chatActions.sendMessage(payload);
    } catch (error) {
      return thunkAPI.rejectWithValue(error);
    }
  }
);

const chatSlice = createSlice({
  name: "chat",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(createChatConnection.pending, (state) => {
        state.loading = true;
      })
      .addCase(createChatConnection.fulfilled, (state, action) => {
        state.loading = false;
        state.socket = action.payload;
      })
      .addCase(createChatConnection.rejected, (state) => {
        state.socket = undefined;
        state.loading = false;
        state.error = "Something went wrong";
      })
      .addCase(sendMessage.pending, (state) => {
        state.loading = true;
      })
      .addCase(sendMessage.fulfilled, (state, action) => {
        state.chats.push(action.payload);
      })
      .addCase(sendMessage.rejected, (state) => {
        state.error = "Not send.";
      });
  },
});

export default chatSlice.reducer;
