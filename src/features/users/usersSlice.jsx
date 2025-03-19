import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

// יצירת פעולות אסינכרוניות עם createAsyncThunk
export const serverSignUp = createAsyncThunk("user-SignUp", async (user, thunkApi) => {
  try {
    let { data } = await axios.post("https://localhost:7206/api/Client", user);
    return data;
  } catch (error) {
    return thunkApi.rejectWithValue(error.response?.data || "Error occurred");
  }
});

export const serverSignIn = createAsyncThunk("user-SignIn", async (user, thunkApi) => {
  try {
    const { data } = await axios.post("https://localhost:7206/api/Client/SignIn", user);
    return data;
  } catch (error) {
    if (error.response && error.response.status === 404) {
      return thunkApi.rejectWithValue("המשתמש לא נמצא במערכת.");
    }
    return thunkApi.rejectWithValue(error.response?.data || "שגיאה כלשהי.");
  }
});

export const userSlice = createSlice({
  name: "user",
  initialState: {
    currentUser: null,
    status: null,
    message: "",
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(serverSignIn.fulfilled, (state, action) => {
        state.currentUser = action.payload;
        state.status = "success";
        state.message = "ההתחברות הצליחה";
      })
      .addCase(serverSignIn.rejected, (state, action) => {
        state.status = "failed";
        if (action.payload === "המשתמש לא נמצא במערכת.") {
          state.message = action.payload;
        } else {
          state.message = action.payload || "שגיאה כלשהי בהתחברות";
        }
      })
      .addCase(serverSignIn.pending, (state) => {
        state.status = "loading";
        state.message = "...בטעינה";
      })
      .addCase(serverSignUp.fulfilled, (state, action) => {
        state.currentUser = action.payload;
        state.status = "success";
        state.message = "המשתמש נוצר בהצלחה";
      })
      .addCase(serverSignUp.rejected, (state, action) => {
        state.status = "failed";
        if (action.payload === "המשתמש קיים כבר עם מייל וסיסמה אלה") {
          state.message = "כבר קיים מייל וסיסמא כזו במערכת";
        } else {
          state.message = action.payload || "אירעה שגיאה";
        }
      })
      .addCase(serverSignUp.pending, (state) => {
        state.status = "loading";
        state.message = "...בטעינה";
      });
  },
});

export default userSlice.reducer;
