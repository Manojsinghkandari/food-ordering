import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

const Dashboard = () => {
  const navigate = useNavigate();
  const { user } = useSelector((state) => state.auth);
  return user?.role === "user"
    ? navigate("/user/dashboard")
    : navigate("/admin/dashboard");
};

export default Dashboard;
