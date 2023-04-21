import { combineReducers, configureStore } from "@reduxjs/toolkit";
import rootReducer from "./root/rootSlice";
import authReducer from "./auth/authSlice";

const reducer = combineReducers({
  root: rootReducer,
  auth: authReducer,
});

const store = configureStore({
  reducer,
  // middleware:(getDefaultMiddleware) => {
  //     return getDefaultMiddleware().concat()
  // }
});

export default store;
