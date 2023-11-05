import React from "react";
import { Link, useNavigate } from "react-router-dom";
import logo from "../assets/logo.png";
import { useDispatch, useSelector } from "react-redux";
import UserProfile from "../assets/user.png";
import { logout } from "../redux/slices/AuthSlice";

const Navbar = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { user, isauthenticated } = useSelector((state) => state.auth);
  const handleLogout = () => {
    dispatch(logout());
    navigate("/");
  };
  return (
    <nav className="flex flex-col lg:flex-row justify-between py-3 mx-6 mb-10 ">
      <div>
        <Link to={"/"}>
          <img src={logo} style={{ height: "70px" }} />
        </Link>

        <h3 className="text-xl font-bold text-gray-600">
          {new Date().toUTCString().slice(0, 16)}
        </h3>
        <h1 className="text-2xl font-bold ">Kandari's Food restaurant</h1>
      </div>
      <div>
        {isauthenticated ? (
          <>
            <div style={{ display: "flex" }}>
              <img
                src={UserProfile}
                style={{
                  height: "50px",
                  borderRadius: "50px",
                }}
              />
              <h3>{user?.email}</h3>
              <button
                onClick={handleLogout}
                style={{
                  backgroundColor: "teal",
                  padding: "0 0.5rem",
                  height: "40px",
                  borderRadius: "0.3rem",
                  marginLeft: "10px",
                  marginTop: "6px",
                }}
              >
                Logout
              </button>
            </div>
          </>
        ) : (
          <>
            <Link to={"/signin"}>
              <i
                className="fa-regular fa-user"
                style={{ fontSize: "2.0rem" }}
              ></i>
            </Link>
          </>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
