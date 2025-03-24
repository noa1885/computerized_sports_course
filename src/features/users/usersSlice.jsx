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
    // טיפול בשגיאה במקרה של 404 (משתמש לא נמצא)
    if (error.response && error.response.status === 404) {
      return thunkApi.rejectWithValue("המשתמש לא נמצא במערכת.");
    }
    // טיפול בשגיאות אחרות
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
      state.currentUser = action.payload;  // עדכון פרטי המשתמש אם ההתחברות הצליחה
      state.status = "success";  // מצב התחברות הצליח
      state.message = "ההתחברות הצליחה";  // הודעה למשתמש
    })
    .addCase(serverSignIn.rejected, (state, action) => {
      state.status = "failed";  // מצב התחברות לא הצליח
      // אם המשתמש לא נמצא במערכת
      if (action.payload === "המשתמש לא נמצא במערכת.") {
        state.message = action.payload;  // הצגת הודעת שגיאה
      } else {
        state.message = action.payload || "שגיאה כלשהי בהתחברות";  // הודעת שגיאה כללית
      }
    })
    .addCase(serverSignIn.pending, (state) => {
      state.status = "loading";  // מצב טעינה עד שהבקשה תושלם
      state.message = "...בטעינה";  // הודעת טעינה
    })
      .addCase(serverSignUp.fulfilled, (state, action) => {
        state.currentUser = action.payload;
        state.status = "success";
        state.message = "המשתמש נוצר בהצלחה";
      })
      .addCase(serverSignUp.rejected, (state, action) => {
        state.status = "failed";
        // אם שגיאה על מייל וסיסמא קיימים
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
