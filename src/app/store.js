import { configureStore } from "@reduxjs/toolkit";
import jobsReducer from "../features/jobSlice";

const store = configureStore({
  reducer: {
    jobs: jobsReducer,
  },
});

export default store;
