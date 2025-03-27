import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import GymLandingPage from "./Components/GymLandingPage";
import CustomWorkoutStart from "./Components/CustomWorkoutStart";
import UserProgress from "./Components/UserProgress";
import TrackSlice from "./Components/TrackSlice";
import ExercisePage from "./features/exercise/ExercisePage";
import ShowAllTheExercise from './features/exercise/ShowAllTheExercise';
import ShowTrack from './features/TrackExercise/ShowTrack'
import TrackDetails from "./features/TrackExercise/TrackDetails ";
import SignUpForm from './Components/SighUp';
import { Provider } from 'react-redux';
import { store } from './app/store';
import LoginPage from './Components/LoginPage';
import Users from './Components/Users';
import PrivateRoute from "./Components/PrivateRoute"

function App() {
  return (
    <Provider store={store}>
      <Router>
        <Routes>
          <Route path="/" element={<GymLandingPage />} />
          <Route path="/progress" element={<UserProgress />} />
          
          {/* שמירת העמוד כפרטי */}
          <Route path="/custom-start" element={<PrivateRoute> <CustomWorkoutStart /></PrivateRoute> } />
          <Route path="/TrackSlice" element={<TrackSlice />} />
          <Route path="/ExercisePage" element={<ExercisePage />} />
          <Route path="/ShowTrack" element={<PrivateRoute> <ShowTrack /></PrivateRoute> } />
          <Route path="/TrackDetails/:trackId" element={<TrackDetails />} />
          <Route path="/exercise" element={<ExercisePage />} />
          <Route path="/login" element={<LoginPage />} />
          
          <Route path="/ShowAllTheExercise" element={<PrivateRoute> <ShowAllTheExercise /></PrivateRoute>
          } />
        </Routes>
      </Router>
    </Provider>
  );
}

export default App;

