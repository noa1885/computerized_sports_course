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
import { Email, Lock } from "@mui/icons-material";
import { serverSignIn } from "../features/users/usersSlice";

export default function LoginPage({ onClose }) {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { currentUser, message, status } = useSelector(
    (state) => state.user || { currentUser: null, message: "", status: "" }
  );

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

  useEffect(() => {
    console.log("status:", status);
    console.log("currentUser:", currentUser);
    if (status === "success" && currentUser) {
      navigate("/");  // אם ההתחברות הצליחה
      if (onClose) onClose();
    }
  }, [status, currentUser, navigate, onClose]);  

  return (
    <Box
      component="form"
      onSubmit={handleSubmit}
      sx={{
        maxWidth: 400,
        mx: "auto",
        p: 4,
        borderRadius: 5,
        backgroundColor: "#f5faff",
        boxShadow: "0px 6px 20px rgba(130, 177, 255, 0.6)",
        border: "2px solid #82b1ff",
        textAlign: "center",
        position: "relative",
        fontFamily: "'Varela Round', sans-serif",
      }}
    >
      <Typography
        variant="h5"
        fontWeight="bold"
        color="#547fc6"
        gutterBottom
        sx={{ mb: 3 }}
      >
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
                  <InputAdornment position="start" sx={{ color: "#547fc6" }}>
                    {icon}
                  </InputAdornment>
                ),
              }}
              sx={{
                "& .MuiInputBase-root": {
                  borderRadius: "25px",
                  backgroundColor: "#e6f0ff",
                  fontSize: "16px",
                  height: "55px",
                  color: "#333",
                },
                "& .MuiOutlinedInput-notchedOutline": {
                  borderColor: "#82b1ff",
                },
                "&:hover .MuiOutlinedInput-notchedOutline": {
                  borderColor: "#547fc6",
                },
                "&.Mui-focused .MuiOutlinedInput-notchedOutline": {
                  borderColor: "#547fc6",
                },
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

      {status === "loading" && (
        <Typography color="#82b1ff" mt={2}>
          טוען...
        </Typography>
      )}

      {status === "succeeded" && currentUser && (
        <Typography color="#82b1ff" mt={2}>
          התחברת בהצלחה!
        </Typography>
      )}

      <Button
        type="submit"
        variant="contained"
        sx={{
          mt: 4,
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
        התחבר
      </Button>
    </Box>
  );
}
