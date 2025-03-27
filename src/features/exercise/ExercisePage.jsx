import React, { useState } from "react";
import { useDispatch } from 'react-redux';
import Exercise from "./Exercise";
import { useSelector } from 'react-redux';
import {postFullFitnessTrack} from "./exerciseSlice";
import { useNavigate } from "react-router-dom";

const ExercisePage = () => {
  const exercises = useSelector((state) => state.trackE.currentTrackExercise); // שלוף את התרגילים מהסטור

  console.log("exercises", exercises);

  const [currentIndex, setCurrentIndex] = useState(0);
  const [isExerciseOpen, setIsExerciseOpen] = useState(true);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [scores, setScores] = useState([]);//שמירת ציונים למסלול

  const userId = useSelector((state) => state.user.currentUser?.id);

const handleSubmitTrack = () => {
  const track = {
    date: new Date().toISOString(),
    clientId: userId,
    duration: exercises.reduce((sum, ex) => sum + (ex.duration || 1), 0), // או קבוע כמו 6
    exercises: scores,
  };

  dispatch(postFullFitnessTrack(track));
  navigate("/ShowTrack");
};



  const handleClose = () => {
    setIsExerciseOpen(false);
    navigate("/ShowTrack");
  };

  const handleSubmitScore = async (score) => {
    dispatch(postExerciseTrack(score));
  };

  const goToNextExercise = (score) => {
    // שמירת הציון
    const currentExerciseId = exercises[currentIndex].id;
    setScores(prev => [...prev, { fitnessExerciseId: currentExerciseId, mark: score }]);
  
    // מעבר לתרגיל הבא או סיום
    if (currentIndex < exercises.length - 1) {
      setCurrentIndex(currentIndex + 1);
    } else {
      handleSubmitTrack(); // בסיום, שליחה
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
