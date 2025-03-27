import { useSelector } from "react-redux";
import { Navigate } from "react-router-dom";

function PrivateRoute({ children }) {
  const user = useSelector(state => state.user.currentUser); // בדיקה אם המשתמש מחובר

  if (!user) {
    return <Navigate to="/login" />;
  }

  return children;
}

export default PrivateRoute;
