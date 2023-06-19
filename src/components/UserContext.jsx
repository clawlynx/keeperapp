import axios from "axios";
import { createContext, useEffect, useState } from "react";

export const UserContext = createContext();

export const UserContextProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [notes, setNotes] = useState([]);
  const [fetch, setFetch] = useState("");
  useEffect(() => {
    axios.get("/viewnotes").then((response) => {
      if (response.data === "error") {
        setNotes(undefined);
        return;
      } else {
        setNotes(response.data);
      }
    });
  }, [fetch]);
  const fetchUser = async () => {
    const response = await axios.get("/profile");
    setUser(response.data);
  };
  useEffect(() => {
    fetchUser();
  }, []);

  return (
    <UserContext.Provider
      value={{ user, setUser, notes, setNotes, fetch, setFetch }}
    >
      {children}
    </UserContext.Provider>
  );
};
