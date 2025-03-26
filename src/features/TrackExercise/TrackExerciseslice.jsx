import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

// פעולה שמביאה תרגיל לפי ID
export const getExercise = createAsyncThunk(
  "exercise/fetch",
  async (id, thunkApi) => {
    try {
      let { data } = await axios.get(`https://localhost:7206/api/FitnessExercise/${id}`);
      console.log(data)
      return data;
    } catch (error) {
      return thunkApi.rejectWithValue(error.response?.data || "שגיאה כלשהי.");
    }
  }
);

export const getTrackByIdClient = createAsyncThunk(
  "track/fetch",  // שם פעולה חדש
  async (id, thunkApi) => {
    try {
      let { data } = await axios.get(`https://localhost:7206/api/FitnessTrack/${id}`);  // יש לשנות את ה-API כאן אם צריך
      console.log(data);
      return data;
    } catch (error) {
      return thunkApi.rejectWithValue(error.response?.data || "שגיאה כלשהי.");
    }
  }
);

export const TrackExercise = createSlice({
  name: "exercise",
  initialState: {
    currentExercise: null,
    currentTrack: null,  // הוסף את המידע של ה-Track
    status: null,
    message: "",
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      // פעולת getExercise
      .addCase(getExercise.pending, (state) => {
        state.status = "loading";
        state.message = "טוען תרגיל...";
      })
      .addCase(getExercise.fulfilled, (state, action) => {
        state.currentExercise = action.payload;
        state.status = "success";
        state.message = "תרגיל נטען בהצלחה!";
      })
      .addCase(getExercise.rejected, (state, action) => {
        state.status = "failed";
        state.message = action.payload || "שגיאה בטעינת התרגיל.";
      })

      // פעולת getTrackByIdClient
      .addCase(getTrackByIdClient.pending, (state) => {
        state.status = "loading";
        state.message = "טוען מסלול...";
      })
      .addCase(getTrackByIdClient.fulfilled, (state, action) => {
        state.currentTrack = action.payload;
        state.status = "success";
        state.message = "מסלול נטען בהצלחה!";
      })
      .addCase(getTrackByIdClient.rejected, (state, action) => {
        state.status = "failed";
        state.message = action.payload || "שגיאה בטעינת המסלול.";
      });
  },
});

export default TrackExercise.reducer;
