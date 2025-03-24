import React, { useState } from "react";
import { Box, Typography, Card, CardMedia, CardContent, Button, TextField, IconButton } from "@mui/material";
import CloseIcon from '@mui/icons-material/Close';

const Exercise = ({ exercise, onNext, onClose }) => {
  const [score, setScore] = useState(localStorage.getItem(`score-${exercise.name}`) || "");

  const handleScoreChange = (e) => {
    const value = Math.max(1, Math.min(10, Number(e.target.value)));
    setScore(value);
  };

  const handleNext = () => {
    localStorage.setItem(`score-${exercise.name}`, score);
    onNext(score);
  };

  if (!exercise) return <div>לא נמצא תרגיל</div>;

  return (
    <Box
      sx={{
        maxWidth: 600,
        mx: "auto",
        p: 4,
        borderRadius: 5,
        backgroundColor: "#fff",
        boxShadow: "0px 6px 25px rgba(150, 20, 20, 0.5)",
        border: "3px solid orange",
        textAlign: "center",
        position: "absolute",
        top: "50%",
        left: "50%",
        transform: "translate(-50%, -50%)",
      }}
    >
      {/* כפתור סגירה */}
      <IconButton 
        onClick={onClose} 
        sx={{ position: "absolute", top: 10, right: 10, color: "red" }}
      >
        <CloseIcon fontSize="large" />
      </IconButton>

      <Typography variant="h4" fontWeight="bold" color="red" gutterBottom>
        {exercise.name}
      </Typography>
      
      <Card sx={{ boxShadow: "none", backgroundColor: "transparent", display: "flex", justifyContent: "center" }}>
        <CardMedia
          component="img"
          image={exercise.image}
          alt={exercise.name}
          sx={{ borderRadius: "15px", height: 300, objectFit: "cover", margin: "0 auto" }}
        />
      </Card>

      <CardContent>
        <Typography variant="body1" color="text.secondary" sx={{ mb: 2 }}>
          {exercise.description}
        </Typography>

        <TextField
          label="הזן ציון (1-10)"
          variant="outlined"
          type="number"
          fullWidth
          value={score}
          onChange={handleScoreChange}
          inputProps={{ min: 1, max: 10 }}
          sx={{ mb: 2 }}
        />

        <Button
          variant="contained"
          sx={{ width: "100%", backgroundColor: "red", color: "white", fontSize: "1.2rem", fontWeight: "bold" }}
          onClick={handleNext}
        >
          תרגיל הבא
        </Button>
      </CardContent>
    </Box>
  );
};

export default Exercise;
