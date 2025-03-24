import { configureStore } from "@reduxjs/toolkit";
import usersReducer from "../features/users/usersSlice";
import exerciseReducer from "../features/exercise/exerciseSlice"
export const store = configureStore({
  reducer: {
    user: usersReducer,  // שים לב ששינית מ-users ל-user כאן
    exercise:exerciseReducer
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      immutableCheck: false, // משבית בדיקות אימיוטביליות כדי למנוע האטה
      serializableCheck: false, // משבית בדיקות סריאליזציה לביצועים טובים יותר
    }),
});
