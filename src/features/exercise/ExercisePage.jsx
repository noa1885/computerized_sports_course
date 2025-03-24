import React, { useState } from "react";
import { useDispatch } from 'react-redux';
import Exercise from "./Exercise";
import { postExerciseTrack } from "./exerciseSlice";
import { useNavigate } from "react-router-dom";

const ExercisePage = ({ exercises = [
  { name: "תרגיל 1", description: "תיאור של תרגיל 1", image: "/path/to/image1.jpg" },
  { name: "תרגיל 2", description: "תיאור של תרגיל 2", image: "/path/to/image2.jpg" },
  { name: "תרגיל 3", description: "תיאור של תרגיל 3", image: "/path/to/image3.jpg" },
] }) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isExerciseOpen, setIsExerciseOpen] = useState(true);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleClose = () => {
    setIsExerciseOpen(false);
    navigate("/home"); // לאחר סגירה ננתב הביתה
  };

  const handleSubmitScore = async (score) => {
    dispatch(postExerciseTrack(score));
  };

  const goToNextExercise = (score) => {
    handleSubmitScore(score);
    if (currentIndex < exercises.length - 1) {
      setCurrentIndex(currentIndex + 1);
    }
  };

  if (!isExerciseOpen || !exercises[currentIndex]) return <div>אין מידע על תרגיל</div>;

  return (
    <div>
      <Exercise 
        exercise={exercises[currentIndex]} 
        onNext={goToNextExercise} 
        onClose={handleClose} // מעביר את פונקציית הסגירה
      />
    </div>
  );
};

export default ExercisePage;
