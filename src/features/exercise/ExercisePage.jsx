import React, { useState } from "react";
import { useDispatch } from 'react-redux';
import Exercise from "./Exercise";
import { useSelector } from 'react-redux';
import { postExerciseTrack } from "./exerciseSlice";
import { useNavigate } from "react-router-dom";

const ExercisePage = () => {
  const exercises = useSelector((state) => state.trackE.currentTrackExercise); // שלוף את התרגילים מהסטור

  const [currentIndex, setCurrentIndex] = useState(0);
  const [isExerciseOpen, setIsExerciseOpen] = useState(true);
  const dispatch = useDispatch();
  const navigate = useNavigate();


  const handleClose = () => {   
    setIsExerciseOpen(false);
    navigate("/ShowTrack");
  };

  const handleSubmitScore = async (score) => {
    dispatch(postExerciseTrack(score)); 
  };
  const goToNextExercise = (score) => {
    handleSubmitScore(score);
    if (currentIndex < exercises.length - 1) {
      setCurrentIndex(currentIndex + 1);
    } else {
      handleClose(); 
    }
  };

  if (!isExerciseOpen || !exercises || exercises.length === 0 || !exercises[currentIndex]) {
    handleClose()
  }
  
  return (
    <div>
      <Exercise 
        exercise={exercises[currentIndex]} 
        onNext={goToNextExercise} 
        onClose={handleClose}
        duration={exercises[currentIndex].duration}
      />
    </div>
  );
};

export default ExercisePage;
