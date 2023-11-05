import { Link, useNavigate } from "react-router-dom";
import "./SignUp.css";
import { useState } from "react";
import { useDispatch } from "react-redux";
import { registerUser } from "../../redux/slices/AuthSlice";

const SignUp = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleRegister = (e) => {
    e.preventDefault();
    dispatch(registerUser({ email, password, role: "user" }));
    navigate("/user/dashboard");
  };
  return (
    <div className="Sign-up">
      <form onSubmit={handleRegister}>
        <div className="Details">
          <h1>Create account</h1>
          <div className="div">
            <label>Your Name</label>
            <input type="text" />
          </div>
          <div className="div">
            <label>Email</label>
            <input
              value={email}
              onChange={(e) => {
                setEmail(e.target.value);
              }}
              type="email"
            />
          </div>
          <div className="div">
            <label>Password</label>
            <input
              value={password}
              onChange={(e) => {
                setPassword(e.target.value);
              }}
              type="password"
            />
          </div>
          <span className="character">
            Passwords must be at least 8 characters
          </span>
          <div className="div enter">
            <label> Re-enter Password</label>
            <input type="password" />
          </div>
          <button>Create your account</button>
          <div className="account">
            <span>Already have an account ?</span>
            <Link to={"/signin"} style={{ textDecoration: "none" }}>
              sign in
            </Link>
          </div>
        </div>
      </form>
    </div>
  );
};

export default SignUp;
