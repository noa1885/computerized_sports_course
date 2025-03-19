import { configureStore } from "@reduxjs/toolkit";
import usersReducer from "../features/users/usersSlice";

export const store = configureStore({
  reducer: {
    user: usersReducer,  // שים לב ששינית מ-users ל-user כאן
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      immutableCheck: false, // משבית בדיקות אימיוטביליות כדי למנוע האטה
      serializableCheck: false, // משבית בדיקות סריאליזציה לביצועים טובים יותר
    }),
});
