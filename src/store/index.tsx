import { combineReducers, configureStore } from "@reduxjs/toolkit";
import rootReducer from "./root/rootSlice";
import authReducer from "./auth/authSlice";
import chatReducer from "./chat/chatSlice";

const reducer = combineReducers({
  root: rootReducer,
  auth: authReducer,
  chat: chatReducer,
});

const store = configureStore({
  reducer,
  middleware: (getDefaultMiddleware) => {
    return getDefaultMiddleware({
      serializableCheck: false,
    });
  },
  // middleware:(getDefaultMiddleware) => {
  //     return getDefaultMiddleware().concat()
  // }
});

export default store;
