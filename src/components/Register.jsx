import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";

const Register = () => {
  const [registration, setRegistration] = useState({
    name: "",
    email: "",
    password: "",
  });
  const navigate = useNavigate();
  const handleChange = (event) => {
    const { name, value } = event.target;
    setRegistration({
      ...registration,
      [name]: value,
    });
  };

  const handleClick = (e) => {
    e.preventDefault();
    axios
      .post("/register", {
        name: registration.name,
        email: registration.email,
        password: registration.password,
      })
      .then((response) => {
        if (response.data === "mail exists") {
          alert("EMAIL ID ALREADY EXISTS. PLEASE TRY A DIFFERENT EMAIL ID");
        } else {
          alert("SUCCESSFULLY REGISTERED. PLEASE LOGIN NOW");
          navigate("/login");
        }
      });
  };

  return (
    <form className="text-center w-auto m-auto login-form">
      <h1 className="mb-2">Register</h1>
      <div className="mb-3 login-input">
        <input
          type="text"
          name="name"
          value={registration.name}
          onChange={handleChange}
          className="form-control"
          placeholder="FullName"
          id="fullName1"
        />
      </div>
      <div className="mb-3 login-input">
        <input
          type="email"
          name="email"
          value={registration.email}
          className="form-control"
          onChange={handleChange}
          placeholder="name@email.com"
          id="exampleInputEmail1"
          aria-describedby="emailHelp"
        />
      </div>
      <div className="mb-3 login-input">
        <input
          type="password"
          name="password"
          value={registration.password}
          className="form-control"
          onChange={handleChange}
          placeholder="password"
          id="exampleInputPassword1"
        />
      </div>

      <button onClick={handleClick} className="btn btn-warning login-input">
        Register
      </button>
      <div className="register-prompt p-3">
        <p>
          Already a member?
          <Link to={"/login"} className="register-link">
            {" "}
            Login
          </Link>
        </p>
      </div>
    </form>
  );
};
export default Register;
