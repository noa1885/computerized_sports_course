import React, { useState, useEffect } from "react";
import { Box, Typography, Card, CardMedia, CardContent, Button, TextField, IconButton, Dialog, DialogActions, DialogContent, DialogTitle, CircularProgress } from "@mui/material";
import CloseIcon from '@mui/icons-material/Close';

const Exercise = ({ exercise, onNext, onClose }) => {
  const [score, setScore] = useState("");
  const [timeLeft, setTimeLeft] = useState(exercise.duration * 60); // זמן בשניות
  const [isScoreEntered, setIsScoreEntered] = useState(false);
  
  useEffect(() => {
    setScore("");
    setTimeLeft(exercise.duration * 60);
    setIsScoreEntered(false);
  }, [exercise]);

  useEffect(() => {
    if (timeLeft > 0) {
      const timer = setInterval(() => {
        setTimeLeft(prevTime => prevTime - 1);
      }, 1000);
      return () => clearInterval(timer);
    }
  }, [timeLeft]);

  const handleScoreChange = (e) => {
    const value = Number(e.target.value);
    if (value >= 1 && value <= 10) {
      setScore(value);
      setIsScoreEntered(true);
    }
  };

  const handleNext = () => {
    if (isScoreEntered) {
      onNext(score);
    }
  };

  return (
    <Box sx={{ textAlign: "center", padding: 2 }}>
      <IconButton onClick={onClose} sx={{ position: "absolute", top: 10, left: 10 }}>
        <CloseIcon fontSize="large" />
      </IconButton>

      <Typography variant="h3" sx={{ marginBottom: 3 }}>{exercise.name}</Typography>

      <Card sx={{ boxShadow: "none", backgroundColor: "transparent", display: "flex", justifyContent: "center", marginBottom: 3 }}>
        <CardMedia
          component="img"
          image={exercise.image}
          alt={exercise.name}
          sx={{ borderRadius: "15px", height: "50vh", objectFit: "contain", width: "90vw", marginBottom: 3 }}
        />
      </Card>

      {/* טיימר */}
      <Box sx={{ position: "relative", display: "inline-block", marginBottom: 3 }}>
        <CircularProgress variant="determinate" value={(timeLeft / (exercise.duration * 60)) * 100} size={100} />
        <Typography variant="h5" sx={{ position: "absolute", top: "50%", left: "50%", transform: "translate(-50%, -50%)" }}>
          {isNaN(timeLeft) ? "00:00" : `${Math.floor(timeLeft / 60)}:${String(timeLeft % 60).padStart(2, "0")}`}
        </Typography>
      </Box>

      <CardContent>
        <TextField
          label="הזן ציון (1-10)"
          type="number"
          value={score}
          onChange={handleScoreChange}
          inputProps={{ min: 1, max: 10 }}
          sx={{ mb: 2, width: "50%" }}
        />

        <Button
          variant="contained"
          onClick={handleNext}
          disabled={!isScoreEntered}
          sx={{ backgroundColor: "#ff5722", color: "white", padding: "10px 20px", fontSize: "1.2rem" }}
        >
          תרגיל הבא
        </Button>
      </CardContent>
    </Box>
  );
};

export default Exercise;
