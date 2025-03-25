import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { Provider } from 'react-redux';
import { store } from './app/store';
import LoginPage from './Components/LoginPage';
import Users from './Components/Users';
import PrivateRoute from './Components/PrivateRoute';
import IndexPage from './Components/index'; 
import SignUpForm from './Components/SighUp';
import ExercisePage from './features/exercise/ExercisePage';
import ShowAllTheExercise from './features/exercise/showAllTheExercise';

function App() {
  return (
    <Provider store={store}>
      <Router>
        <Routes>
         <Route path="/" element={<ExercisePage />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/ShowAllTheExercise" element={<ShowAllTheExercise />} />
          <Route path="/signup" element={<SignUpForm />} />
          <Route path="/indexPage" element={<IndexPage />} />

          <Route
            path="/users"
            element={ <PrivateRoute>   <Users />      </PrivateRoute>
            }
          />
        </Routes>
      </Router>
    </Provider>
  );
}

export default App;
