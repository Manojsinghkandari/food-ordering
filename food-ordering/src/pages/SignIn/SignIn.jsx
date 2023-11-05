import { Link, useNavigate } from "react-router-dom";
import "./signIn.css";
import { useState } from "react";
import { useDispatch } from "react-redux";
import { loginUser } from "../../redux/slices/AuthSlice";
const Signin = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleLogin = (e) => {
    e.preventDefault();
    dispatch(loginUser({ email, password, role: "user" }));
    navigate("/dashboard");
  };
  return (
    <div className="sign-in">
      <form onSubmit={handleLogin}>
        <div className="Details">
          <h1>Sign in</h1>
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
          <button>Sign in</button>
          <div className="span">
            <input type="checkbox" />
            <span>Keep me Signed in.</span>
          </div>
          <div className="last">
            <span>New to Website?</span>
          </div>
          <Link to={"/signup"}>
            <button>Create your account</button>
          </Link>
        </div>
      </form>
    </div>
  );
};

export default Signin;
