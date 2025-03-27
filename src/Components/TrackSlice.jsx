import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
export const getTrackExercise = createAsyncThunk(
  "trackExercise/fetch",
  async ({ id, categories, time }, thunkApi) => {
    try {
      const response = await axios.post(
        "https://localhost:7206/api/FitnessExercise/by-time",
        {
          "id": id,
          "ctgry": categories,
          "time": time
        }
      );
      return response.data; // מחזיר את הנתונים מהשרת
    } catch (error) {
      console.error(error);
      return thunkApi.rejectWithValue(
        error.response?.data || "שגיאה כלשהי."
      );
    }
  }
);









export const trackExerciseSlice = createSlice({
  name: "trackExercise",
  initialState: {
    currentTrackExercise: null,
    status: null,
    message: "",
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getTrackExercise.pending, (state) => {
        state.status = "loading";
        state.message = "טוען נתוני תרגול...";
      })
      .addCase(getTrackExercise.fulfilled, (state, action) => {
        state.currentTrackExercise = action.payload;
        state.status = "success";
        state.message = "הנתונים נטענו בהצלחה!";
      })
      .addCase(getTrackExercise.rejected, (state, action) => {
        state.status = "failed";
        state.message = action.payload || "שגיאה בטעינת הנתונים.";
      });
  },
});

export default trackExerciseSlice.reducer;
