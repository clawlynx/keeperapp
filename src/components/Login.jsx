import { useContext, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import { UserContext } from "./UserContext";

const Login = () => {
  const [userData, setUserData] = useState({
    email: "",
    password: "",
  });
  const { setUser, setFetch } = useContext(UserContext);
  const navigate = useNavigate();
  const handleLoginChange = (event) => {
    const { name, value } = event.target;
    setUserData({
      ...userData,
      [name]: value,
    });
  };
  const handleLoginSubmit = async (e) => {
    e.preventDefault();
    const response = await axios.post("/login", {
      email: userData.email,
      password: userData.password,
    });

    if (response.data === "invalid user") {
      alert("USER NOT FOUND. PLEASE REGISTER");
      return;
    }
    if (response.data === "pass not ok") {
      alert("INCORRECT PASSWORD. PLEASE TRY AGAIN");
      return;
    }
    alert("LOGIN SUCCESSFUL");
    setUser(response.data);
    navigate("/");
    setFetch("ok1");
  };
  return (
    <form className="text-center w-auto m-auto login-form">
      <h1>Login</h1>
      <div className="mb-3 login-input">
        <input
          type="email"
          className="form-control"
          name="email"
          onChange={handleLoginChange}
          value={userData.email}
          placeholder="name@email.com"
          id="exampleInputEmail1"
          aria-describedby="emailHelp"
        />
      </div>
      <div className="mb-3 login-input">
        <input
          type="password"
          name="password"
          onChange={handleLoginChange}
          value={userData.password}
          className="form-control"
          placeholder="password"
          id="exampleInputPassword1"
        />
      </div>

      <button
        onClick={handleLoginSubmit}
        className="btn btn-warning login-input"
      >
        Login
      </button>
      <div className="register-prompt p-3">
        <p>
          Dont have an Account?
          <Link to={"/register"} className="register-link">
            {" "}
            Register Now
          </Link>
        </p>
      </div>
    </form>
  );
};
export default Login;
