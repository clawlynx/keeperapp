import React, { useContext, useState } from "react";
import AddIcon from "@mui/icons-material/Add";
import { Fab, Zoom } from "@mui/material";
import axios from "axios";
import { UserContext } from "./UserContext";
import { useNavigate } from "react-router-dom";

function CreateArea() {
  const [currentNote, setCurrentNote] = useState({
    title: "",
    content: "",
  });
  const [isExpanded, setExpanded] = useState(false);
  const { user, fetch, setFetch } = useContext(UserContext);
  const navigate = useNavigate();

  function handleChange(event) {
    const { name, value } = event.target;
    setCurrentNote({
      ...currentNote,
      [name]: value,
    });
  }

  const handleClick = async (event) => {
    event.preventDefault();
    if (!user) {
      alert("Login First to Continue");
      navigate("/login");
      return;
    }
    if (user) {
      const response = await axios.post("/note", {
        title: currentNote.title,
        content: currentNote.content,
      });
      if (response.data === "ok") {
        setCurrentNote({
          title: "",
          content: "",
        });
        setExpanded(false);
        setFetch(fetch + "okeyy");
        return;
      } else {
        alert("something Wrong");
      }
    }
  };
  function expandto() {
    setExpanded(true);
  }
  if (!user) {
    return (
      <div className="pt-3 my-3 home-div">
        <h2 className="text-center">Welcome</h2>
        <h4 className="text-center px-2">
          Keep Your notes in an easy and orderly manner
        </h4>
        <form className="create-note">
          {isExpanded ? (
            <input
              onChange={handleChange}
              name="title"
              placeholder="Title"
              value={currentNote.title}
            />
          ) : null}
          <textarea
            onChange={handleChange}
            onClick={expandto}
            name="content"
            value={currentNote.content}
            placeholder="Take a note..."
            rows={isExpanded ? 3 : 1}
          />
          <Zoom in={isExpanded}>
            <Fab onClick={handleClick}>
              <AddIcon />
            </Fab>
          </Zoom>
        </form>
      </div>
    );
  }

  return (
    <div>
      <form className="create-note">
        {isExpanded ? (
          <input
            onChange={handleChange}
            name="title"
            placeholder="Title"
            value={currentNote.title}
          />
        ) : null}
        <textarea
          onChange={handleChange}
          onClick={expandto}
          name="content"
          value={currentNote.content}
          placeholder="Take a note..."
          rows={isExpanded ? 3 : 1}
        />
        <Zoom in={isExpanded}>
          <Fab onClick={handleClick}>
            <AddIcon />
          </Fab>
        </Zoom>
      </form>
    </div>
  );
}

export default CreateArea;
