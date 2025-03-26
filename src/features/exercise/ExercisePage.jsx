import React, { useState } from "react";
import { useDispatch } from 'react-redux';
import Exercise from "./Exercise";
import { postExerciseTrack } from "./exerciseSlice";
import { useNavigate } from "react-router-dom";

const ExercisePage = ({ exercises = [
  { name: "תרגיל 1", description: "תיאור של תרגיל 1", image: "/path/to/image1.jpg" ,time:1},
  { name: "תרגיל 2", description: "תיאור של תרגיל 2", image: "/path/to/image2.jpg",time:5 },
  { name: "תרגיל 3", description: "תיאור של תרגיל 3", image: "/path/to/image3.jpg" ,time:2},
] }) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isExerciseOpen, setIsExerciseOpen] = useState(true); 
  const dispatch = useDispatch();

  const navigate = useNavigate();
  const handleClose = () => {
    setIsExerciseOpen(false);
    navigate("/ShowTrack")

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

  if (!isExerciseOpen || !exercises[currentIndex]) return <div>אין מידע על תרגיל</div>;

  return (
    <div>
      <Exercise 
        exercise={exercises[currentIndex]} 
        onNext={goToNextExercise} 
        onClose={handleClose}
        time={exercises[currentIndex].time}
      />
    </div>
  );
};

export default ExercisePage;
