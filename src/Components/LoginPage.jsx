import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { TextField, Button, Box, Typography, InputAdornment, Grid } from "@mui/material";
import { Email, Lock } from "@mui/icons-material";
import { serverSignIn } from "../features/users/usersSlice";

export default function LoginPage() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { currentUser, message, status } = useSelector((state) => state.user || { currentUser: null, message: "", status: "" });
  
  const [formData, setFormData] = useState({ mail: "", password: "" });

  useEffect(() => {
    console.log("Checking navigation conditions:", { status, currentUser });
    if (status === "success" && currentUser) {
      console.log("Navigating to /indexPage");
      navigate("/indexPage");
    }
  }, [status, currentUser, navigate]);
  
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
        boxShadow: "0px 4px 15px rgba(128, 0, 128, 0.5)",
        border: "2px solid purple",
        textAlign: "center",
        position: "absolute",
        top: "50%",
        left: "50%",
        transform: "translate(-50%, -50%)",
      }}
    >
      {currentUser && currentUser.name && (
        <Typography variant="h6" color="purple" textAlign="center" mb={2}>
          ברוך הבא, {currentUser.name}!
        </Typography>
      )}
      <Typography variant="h5" fontWeight="bold" color="purple" mb={2}>
        התחברות
      </Typography>
      <Grid container spacing={2}>
        {[{ label: "מייל", name: "mail", type: "email", icon: <Email /> },
          { label: "סיסמה", name: "password", type: "password", icon: <Lock /> }].map(({ label, name, type, icon }) => (
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
                startAdornment: <InputAdornment position="start">{icon}</InputAdornment>,
              }}
              sx={{
                borderRadius: "25px",
                backgroundColor: "#F5F5F5",
                fontSize: "16px",
                height: "55px",
                "& fieldset": { borderColor: "purple" },
                "&:focus-within fieldset": { borderColor: "purple !important" },
              }}
            />
          </Grid>
        ))}
      </Grid>
      {status === "failed" && message && <Typography color="error" mt={2}>{message}</Typography>}
      {status === "loading" && <Typography color="blue" mt={2}>טוען...</Typography>}
      {status === "succeeded" && currentUser && <Typography color="green" mt={2}>התחבר בהצלחה!</Typography>}
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
        התחבר
      </Button>
    </Box>
  );
}
