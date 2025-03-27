import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";


// פעולה שמביאה תרגיל לפי ID
export const getExercise = createAsyncThunk(
  "exercise/fetch",
  async (id, thunkApi) => {
    try {
      let { data } = await axios.get(`https://localhost:7206/api/FitnessExercise/${id}`);
      console.log(data);
      return data;
    } catch (error) {
      return thunkApi.rejectWithValue(error.response?.data || "שגיאה כלשהי.");
    }
  }
);

export const getExerciseById = createAsyncThunk(
  "exercise/fetch",
  async (id, thunkApi) => {
    try {
      let { data } = await axios.get(`https://localhost:7206/api/FitnessExercise/${id}`);
      console.log(data);
      return data;
    } catch (error) {
      return thunkApi.rejectWithValue(error.response?.data || "שגיאה כלשהי.");
    }
  }
);

// ⬅️ שמירה של תרגיל בודד
export const postExerciseTrack = createAsyncThunk(
  "ExerciseTrack-post",
  async (ExerciseTrack, thunkApi) => {
    try {
      let { data } = await axios.post("https://localhost:7206/api/TrackExercise", ExerciseTrack);
      return data;
    } catch (error) {
      return thunkApi.rejectWithValue(error.response?.data || "Error occurred");
    }
  }
);

// ⬅️ שמירת מסלול שלם מותאם אישית
export const postFullFitnessTrack = createAsyncThunk(
  "exercise/postFullTrack",
  async (track, thunkAPI) => {
    try {
      const { data } = await axios.post("https://localhost:7206/api/FitnessTrack", track);
      return data;
    } catch (err) {
      return thunkAPI.rejectWithValue("שגיאה בשמירת המסלול");
    }
  }
);

export const exerciseSlice = createSlice({
  name: "exercise",
  initialState: {
    currentExercise: null,
    status: null,
    message: "",
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
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

      // 🔵 postFullFitnessTrack – שמירת מסלול מותאם
      .addCase(postFullFitnessTrack.pending, (state) => {
        state.status = "loading";
        state.message = "שולח את המסלול המותאם...";
      })
      .addCase(postFullFitnessTrack.fulfilled, (state) => {
        state.status = "success";
        state.message = "המסלול המותאם נשמר בהצלחה!";
      })
      .addCase(postFullFitnessTrack.rejected, (state, action) => {
        state.status = "failed";
        state.message = action.payload || "שגיאה בשמירת המסלול המותאם.";
      });
  },
});

export default exerciseSlice.reducer;
