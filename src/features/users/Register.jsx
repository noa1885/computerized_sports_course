// LoginPage.jsx
import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import {loginSrever, users} from '../features/users/usersSlice'

const Rejister = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [age, setAge] = useState('');
  const [idNumber, setIdNumber] = useState('');
  const [email, setEmail] = useState('');
  
  const { status, error } = useSelector((state) => state.auth);

  const handleSubmit = async (e) => {
    e.preventDefault();
    dispatch(loginSrever(username))
  
    try {
      const response = await fetch(`http://localhost:5000/api/user/${username}/${password}`, {
        method: "POST",
      });
  
      if (!response.ok) {
        throw new Error("Login failed");
      }
  
      const token = await response.text(); // השרת מחזיר טוקן כטקסט
      console.log("Login successful! Token:", token);
  
      // שמירת הטוקן בלוקאל סטורג' או ב-state לניהול משתמשים מחוברים
      localStorage.setItem("token", token);
  
      navigate('/home'); // מעבר לדף הבית
    } catch (error) {
      console.error("Error:", error);
    }
  };
  
  return (
    <div className="login-page">
      <h2>הרשמה</h2>
      <h1>{Message}</h1>
      <form onSubmit={handleSubmit}>
        <div>
          <label>שם משתמש:</label>
          <input
            type="text"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            placeholder="הכנס שם משתמש"
          />
        </div>
        <div>
          <label>סיסמה:</label>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="הכנס סיסמה"
          />
        </div>
        <div>
          <label>גיל:</label>
          <input
            type="number"
            value={age}
            onChange={(e) => setAge(e.target.value)}
            placeholder="הכנס גיל"
          />
        </div>
        <div>
          <label>תעודת זהות:</label>
          <input
            type="text"
            value={idNumber}
            onChange={(e) => setIdNumber(e.target.value)}
            placeholder="הכנס תעודת זהות"
          />
        </div>
        <div>
          <label>מייל:</label>
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="הכנס מייל"
          />
        </div>
        {status === 'loading' && <p>...המתן</p>}
        {error && <p style={{ color: 'red' }}>{error}</p>}
        <button type="submit">התחבר</button>
      </form>
    </div>
  );
};

export default LoginPage;