import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";

import {
  TextField,
  Button,
  Box,
  Typography,
  InputAdornment,
  Grid,
} from "@mui/material";
import { Email, Lock } from "@mui/icons-material";
import { serverSignIn } from "../features/users/usersSlice";

export default function LoginPage() {
  const dispatch = useDispatch();
  const { currentUser, message, status } = useSelector((state) => state.user || { currentUser: null, message: "", status: "" });
  console.log("Redux State:", { currentUser, message, status });
  const [formData, setFormData] = useState({
    mail: "",
    password: "",
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(serverSignIn({ mail: formData.mail, password: formData.password }));
  };

  return (
    <Box
      component="form"
      onSubmit={handleSubmit}
      sx={{
        maxWidth: 400,
        mx: "auto",
        p: 4,
        borderRadius: 5,
        backgroundColor: "white",
        boxShadow: "0px 4px 20px rgba(128, 0, 128, 0.5)",
        border: "2px solid purple",
        textAlign: "center",
      }}
    >
{currentUser && currentUser.name && (
  <Typography variant="h6" color="purple" textAlign="center" mb={2}>
    ברוך הבא, {currentUser.name}!
  </Typography>
)}



      <Typography variant="h5" fontWeight="bold" color="red" gutterBottom>
        התחברות
      </Typography>

      <Grid container spacing={2}>
        {[
          { label: "מייל", name: "mail", type: "email", icon: <Email /> },
          { label: "סיסמה", name: "password", type: "password", icon: <Lock /> },
        ].map(({ label, name, type, icon }) => (
          <Grid item xs={12} key={name}>
            <TextField
              label={label}
              name={name}
              type={type}
              value={formData[name]}
              onChange={handleChange}
              fullWidth
              required
              InputProps={{
                startAdornment: (
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
                  "&:focus-within fieldset": { borderColor: "purple !important" },
                },
              }}
            />
          </Grid>
        ))}
      </Grid>

      {status === "failed" && message && (
        <Typography color="error" mt={2}>{message}</Typography>
      )}

      {status === "loading" && (
        <Typography color="blue" mt={2}>טוען...</Typography>
      )}

      {status === "succeeded" && user && (
        <Typography color="green" mt={2}>
          התחברת בהצלחה!
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
  {currentUser && currentUser.name ? `שלום, ${currentUser.name}` : "התחבר"}
</Button>

    </Box>
  );
}
