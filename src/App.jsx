import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import GymLandingPage from "./Components/GymLandingPage";
import CustomWorkoutStart from "./Components/CustomWorkoutStart";
import UserProgress from "./Components/UserProgress";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<GymLandingPage />} />
        <Route path="/custom-start" element={<CustomWorkoutStart />} />
        <Route path="/progress" element={<UserProgress />} />
      </Routes>
    </Router>
  );
}

export default App;
