import React, { useEffect, useState } from "react";
import { showFormattedDate } from "../utils/index";
import { getNote } from "../utils/api";
//import { showFormattedDate } from "../utils/api";

function DetailPage({ id }) {
  const [note, setNote] = useState({});

  useEffect(() => {
    getNote(id).then(({ data }) => {
      setNote(data);
    });
  }, [id]);

  const { title, createdAt, body } = note;

  return (
    <div className="note-app__main">
      <div className="note-app__detail-note">
        <h1 className="note-app__detail-note_title">{title}</h1>
        <p className="note-app__detail-note_date">
          {showFormattedDate(createdAt)}
        </p>
        <p className="note-app__detail-note_body">{body}</p>
      </div>
    </div>
  );
}

export default DetailPage;
