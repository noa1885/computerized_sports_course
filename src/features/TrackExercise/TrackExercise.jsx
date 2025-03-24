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
      });
  },
});

export default exerciseSlice.reducer;
