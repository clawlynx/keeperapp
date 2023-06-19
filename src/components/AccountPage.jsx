import { useContext } from "react";
import { UserContext } from "./UserContext";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const AccountPage = () => {
  const { user, setUser, setFetch } = useContext(UserContext);
  const navigate = useNavigate();

  const handleClick = async () => {
    await axios.post("/logout");
    setUser(null);
    navigate("/");
    setFetch("ok2");
  };

  return (
    <div className="p-3 d-flex flex-column justify-content-center gap-2 account-box align-items-center">
      {user ? (
        <>
          <p className="text-center fs-5 align-middle">
            You are Logged in as{" "}
            <span className="fw-bold">
              {user.name}({user.email})
            </span>{" "}
          </p>
          <button onClick={handleClick} className="btn btn-warning fs-5">
            Logout
          </button>
        </>
      ) : (
        <h2>Loading....</h2>
      )}
    </div>
  );
};
export default AccountPage;
