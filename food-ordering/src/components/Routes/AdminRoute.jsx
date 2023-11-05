import { useSelector } from "react-redux";
import { Navigate } from "react-router-dom";

const AdminRoute = ({ children }) => {
  const { user } = useSelector((state) => state.auth);

  if (user?.role === "admin") {
    return children;
  }
  return <Navigate to={"/signin"} />;
};

export default AdminRoute;
