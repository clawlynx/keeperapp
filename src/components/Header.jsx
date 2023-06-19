import React, { useContext } from "react";
import { Link, useNavigate } from "react-router-dom";
import { UserContext } from "./UserContext";

function Header() {
  const navigate = useNavigate();
  const { user } = useContext(UserContext);
  const handleClick = () => {
    navigate(user ? "/account" : "/login");
  };

  return (
    <header>
      <Link className="Link" to={"/"}>
        Keeper
      </Link>
      <div className="user-box">
        <button
          className="user-button btn border border-2 p-2 rounded-3 border-white"
          onClick={handleClick}
        >
          <i className="bi bi-person-circle"></i>
          {user ? user.name.toUpperCase() : "LOGIN"}
        </button>
      </div>
    </header>
  );
}

export default Header;
