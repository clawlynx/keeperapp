import React, { useContext } from "react";
import DeleteIcon from "@mui/icons-material/Delete";
import { UserContext } from "./UserContext";
import axios from "axios";

function Note() {
  const { notes, fetch, setFetch } = useContext(UserContext);
  function handleClick(e, id) {
    e.preventDefault();
    axios.delete("/delete/" + id).then((response) => {
      console.log(response.data);
      setFetch(fetch + "ok");
    });
  }
  if (notes === undefined) {
    return (
      <div className="p-3 m-3">
        <h2 className="text-center p-3 m-3">Please Login to add notes</h2>
      </div>
    );
  }

  return (
    <div className="note-div">
      {notes?.length > 0 ? (
        notes.map((note) => {
          return (
            <div className="note" key={note._id}>
              <h1>{note.title}</h1>
              <p>{note.content}</p>
              <button onClick={(e) => handleClick(e, note._id)}>
                <DeleteIcon />
              </button>
            </div>
          );
        })
      ) : (
        <div className="p-3 m-3">
          <h2 className="text-center p-3 m-3">No new Notes....</h2>
        </div>
      )}
    </div>
  );
}

export default Note;
