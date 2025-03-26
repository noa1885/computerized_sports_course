import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import GymLandingPage from "./Components/GymLandingPage";
import CustomWorkoutStart from "./Components/CustomWorkoutStart";
import UserProgress from "./Components/UserProgress";
import TrackSlice from "./Components/TrackSlice";
import ExercisePage from "./features/exercise/ExercisePage";


function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<GymLandingPage />} />
        <Route path="/progress" element={<UserProgress />} />
        <Route path="/custom-start" element={<CustomWorkoutStart />} />
        <Route path="/TrackSlice" element={<TrackSlice />} />
        <Route path="/ExercisePage" element={<ExercisePage />} />
        <Route path="/CustomWorkoutStart" element={<CustomWorkoutStart />} />


      </Routes>
    </Router>
  );
}

export default App;
