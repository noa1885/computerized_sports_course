import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux"; // import useSelector
import {
  TextField,
  Button,
  Box,
  Typography,
  InputAdornment,
  Grid,
} from "@mui/material";
import { AccountCircle, Email, Lock } from "@mui/icons-material";
import { serverSignUp } from "../features/users/usersSlice";

export default function SignUpForm() {
  const dispatch = useDispatch();
  // בדיקה אם user קיים ב-state, ואם לא, שימוש בערך ברירת מחדל
  const { message, status } = useSelector((state) => state.user || {}); // Get the message and status from the Redux store
  const [formData, setFormData] = useState({
    firstName: "",
    email: "",
    age: "",
    password: "",
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Form Data Submitted:", formData);
    const newClient = {
      name: formData.firstName,
      email: formData.email,
      age: parseInt(formData.age),
      phoneNumber: formData.password,
      mail: formData.email,
      status: true,
    };
    dispatch(serverSignUp(newClient)); // Dispatch the serverSignUp action
  };

  useEffect(() => {
    if (status === "failed" && message) {
      // If the signup failed and there is a message, show the error
      console.log("Error:", message);
    }
  }, [status, message]);

  return (
    <Box
      component="form"
      onSubmit={handleSubmit}
      sx={{
        maxWidth: 600,
        mx: "auto",
        p: 4,
        borderRadius: 5,
        backgroundColor: "white",
        direction: "rtl",
        boxShadow: "0px 4px 20px rgba(128, 0, 128, 0.5)", // purple border
        fontFamily: "'Assistant', sans-serif",
        border: "2px solid purple", // outer border
      }}
    >
      <Typography
        variant="h5"
        gutterBottom
        textAlign="center"
        fontWeight="bold"
        color="red" // red title
        padding="15px"
      >
        Sign Up
      </Typography>

      <Grid container spacing={2}>
        {[ 
          { label: "שם פרטי", name: "firstName", icon: <AccountCircle /> },
          { label: "מייל", name: "email", type: "email", icon: <Email /> },
          { label: "גיל", name: "age", type: "number", icon: null },
          { label: "סיסמה", name: "password", type: "password", icon: <Lock /> },
        ].map(({ label, name, type = "text", icon }) => (
          <Grid item xs={12} sm={6} key={name}>
            <TextField
              label={label}
              name={name}
              type={type}
              value={formData[name]}
              onChange={handleChange}
              fullWidth
              required
              InputLabelProps={name === "age" ? { shrink: true } : {}}
              InputProps={{
                startAdornment: icon && (
                  <InputAdornment position="start" sx={{ color: "orange" }}>
                    {icon}
                  </InputAdornment>
                ),
                sx: {
                  borderRadius: "25px",
                  backgroundColor: "#F5F5F5",
                  fontSize: "16px",
                  height: "55px",
                  color: "gray",
                  "& fieldset": { borderColor: "purple" },
                  "&:focus-within fieldset": {
                    borderColor: "purple !important",
                  },
                },
              }}
                InputLabelProps={{
                sx: { color: "red" },
              }}
            />
          </Grid>
        ))}
      </Grid>

      {status === "failed" && message && (
        <Typography color="error" textAlign="center" mt={2}>
          {message} {/* Display the error message here */}
        </Typography>
      )}

      <Button
        type="submit"
        variant="contained"
        sx={{
          mt: 3,
          backgroundColor: "red", 
          color: "white",
          fontSize: "18px",
          fontWeight: "bold",
          borderRadius: "25px",
          width: "50%",
          py: 1,
          mx: "auto",
          display: "block",
          boxShadow: "0px 4px 15px rgba(206, 96, 69, 0.5)",
          "&:hover": { backgroundColor: "darkred" },
        }}
      >
        אני רוצה להירשם
      </Button>
    </Box>
  );
}
