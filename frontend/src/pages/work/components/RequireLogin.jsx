import { Navigate } from "react-router-dom";

function RequireLogin({ children }) {
  const isLoggedIn =
    localStorage.getItem("username") || sessionStorage.getItem("username");

  if (!isLoggedIn) {
    return <Navigate to="/login" replace />;
  }

  return children;
}

export default RequireLogin;
