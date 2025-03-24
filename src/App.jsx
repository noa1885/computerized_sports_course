import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { Provider } from 'react-redux';
import { store } from './app/store';
import LoginPage from './Components/LoginPage';
import Users from './Components/Users';
import PrivateRoute from './Components/PrivateRoute';
import IndexPage from './Components/index'; // Assuming it's the home page
import SignUpForm from './Components/SighUp';
import Exercise from './features/exercise/Exercise';
import ExercisePage from './features/exercise/ExercisePage';
function App() {
  return (
    <Provider store={store}>
      <Router>
        <Routes>
          <Route path="/" element={<ExercisePage />} /> {/* דף הבית */}
          <Route path="/login" element={<LoginPage />} />
          <Route path="/signup" element={<SignUpForm />} />
          <Route
            path="/users"
            element={
              <PrivateRoute>
                <Users />
              </PrivateRoute>
            }
          />
          {/* If you want an explicit route for IndexPage */}
          <Route path="/indexPage" element={<IndexPage />} />
        </Routes>
      </Router>
    </Provider>
  );
}

export default App;
