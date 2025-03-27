import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
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

export default function SignUpForm({ onClose }) {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { message, status } = useSelector((state) => state.user || {});

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
    const newClient = {
      name: formData.firstName,
      email: formData.email,
      age: parseInt(formData.age),
      phoneNumber: formData.password,
      mail: formData.email,
      status: true,
    };
    dispatch(serverSignUp(newClient));
  };

  useEffect(() => {
    if (status === "success") {
      navigate("/indexPage");
      if (onClose) onClose();
    }
  }, [status, navigate, onClose]);

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
        boxShadow: "0px 4px 20px rgba(130, 177, 255, 0.5)",
        border: "2px solid #82b1ff",
        textAlign: "center",
        direction: "rtl",
      }}
    >
      <Typography
        variant="h5"
        gutterBottom
        fontWeight="bold"
        color="#547fc6"
        mb={3}
      >
        הרשמה
      </Typography>

      <Grid container spacing={2}>
        {[
          { label: "שם פרטי", name: "firstName", icon: <AccountCircle /> },
          { label: "מייל", name: "email", type: "email", icon: <Email /> },
          { label: "סיסמה", name: "password", type: "password", icon: <Lock /> },
          { label: "גיל", name: "age", type: "number", icon: null },
        ].map(({ label, name, type = "text", icon }) => (
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
                startAdornment: icon && (
                  <InputAdornment position="start" sx={{ color: "#82b1ff" }}>
                    {icon}
                  </InputAdornment>
                ),
                sx: {
                  borderRadius: "25px",
                  backgroundColor: "#F0F8FF",
                  fontSize: "16px",
                  height: "55px",
                  color: "gray",
                  "& fieldset": { borderColor: "#82b1ff" },
                  "&:focus-within fieldset": {
                    borderColor: "#547fc6 !important",
                  },
                },
              }}
              InputLabelProps={{
                sx: { color: "#547fc6" },
              }}
            />
          </Grid>
        ))}
      </Grid>

      {status === "failed" && message && (
        <Typography color="error" mt={2}>
          {message}
        </Typography>
      )}

      <Button
        type="submit"
        variant="contained"
        sx={{
          mt: 3,
          backgroundColor: "#82b1ff",
          color: "white",
          fontSize: "18px",
          fontWeight: "bold",
          borderRadius: "25px",
          width: "50%",
          py: 1,
          mx: "auto",
          display: "block",
          boxShadow: "0px 4px 15px rgba(130, 177, 255, 0.5)",
          "&:hover": { backgroundColor: "#547fc6" },
        }}
      >
        אני רוצה להירשם
      </Button>
    </Box>
  );
}
