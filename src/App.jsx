import { useState } from 'react';
import './App.css';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';  // ודא שאתה מייבא את Routes
import { useDispatch } from 'react-redux';

import { Provider } from 'react-redux';
import { store } from './app/store';
import LoginPage from './Components/LoginPage';
import SignUpForm from './Components/SighUp';
function App() {
  const isLoggedIn = false; // מצב זה יכול לבוא מתוך Redux או useState אם רוצים

  return (
    <Provider store={store}>
      <Router>
        <Routes>
          {/* אם המשתמש לא מחובר, מציגים את דף ההתחברות */}
          {!isLoggedIn ? (
            <Route path="/" element={<SignUpForm />} />
          ) : (
            // אם המשתמש מחובר, מציגים את דף המשתמשים
            <Route path="/" element={<Users />} />
          )}
        </Routes>
      </Router>
    </Provider>
  );
}

export default App;