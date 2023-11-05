import { useSelector } from "react-redux";
import { Navigate } from "react-router-dom";

const PrivateRoute = ({ children }) => {
  const { user } = useSelector((state) => state.auth);
  if (user?.role === "user") {
    return children;
  }
  return <Navigate to={"/signin"} />;
};

export default PrivateRoute;
