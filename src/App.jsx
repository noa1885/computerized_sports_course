import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import CustomWorkoutStart from "./Components/CustomWorkoutStart";
import UserProgress from "./Components/UserProgress";
import { Provider } from 'react-redux';
import { store } from './app/store';
import LoginPage from './Components/LoginPage';
import Users from './Components/Users';
import PrivateRoute from './Components/PrivateRoute';
import GymLandingPage from './Components/index'; 
import SignUpForm from './Components/SighUp';
import ExercisePage from './features/exercise/ExercisePage';
import ShowAllTheExercise from './features/exercise/showAllTheExercise';
import ShowTrack from './features/TrackExercise/ShowTrack'
import TrackDetails from "./features/TrackExercise/TrackDetails ";
function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<ExercisePage />} />
        <Route path="/custom-start" element={<CustomWorkoutStart />} />
        <Route path="/progress" element={<UserProgress />} />
        <Route path="/exercise" element={<ExercisePage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/ShowAllTheExercise" element={<ShowAllTheExercise />} />
        <Route path="/signup" element={<SignUpForm />} />
        <Route path="/ShowTrack" element={<ShowTrack />} />
        <Route path="/TrackDetails" element={<TrackDetails />} />
        <Route path="/users" element={<PrivateRoute><Users /></PrivateRoute>} />
      </Routes>
    </Router>
  );
}

export default App;
