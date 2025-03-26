import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

// פעולה שמביאה TrackExercise לפי ID
export const getTrackExercise = createAsyncThunk(
  "trackExercise/fetch",
  async (id,time,categories, thunkApi) => {
    try {
      const { data } = await axios.get(`https://localhost:7206/api/TrackExercise/${id}`);
      console.log(data);
      return data;
    } catch (error) {
      return thunkApi.rejectWithValue(error.response?.data || "שגיאה כלשהי.");
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
