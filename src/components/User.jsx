import React, { useState } from "react";
import './User.css'

export const User = ({ title, body,userId, id, onEdit, onDelete }) => {
  const [isEdit, setIsEdit] = useState(false);

  const handleEdit = () => {
    setIsEdit(!isEdit);
  };

  const handleDelete = () => {
    onDelete(id);
  };

  const handleOnEditSubmit = (event) => {
    event.preventDefault();
    onEdit(id, event.target.title.value, event.target.body.value, event.target.userId.value);
    setIsEdit(!isEdit);
  };

  return (
    <div className="edit-form-container">
      {isEdit ? (
        <form onSubmit={handleOnEditSubmit}>
          <input placeholder="Title" name="title" defaultValue={title} />
          <input placeholder="useId" name="userid" defaultValue={userId} />
          <textarea placeholder="Body" name="body" defaultValue={body} />
          <button onSubmit={handleOnEditSubmit}>Save</button>
        </form>
      ) : (
        <div className="post">
          <span className="post-title">{title}</span>
          <span className="post-body">{body}</span>
          <span className="post-userid">{userId}</span>
          <div className="button-container">
            <button onClick={handleEdit}>Edit</button>
            <button onClick={handleDelete}>Delete</button>
          </div>
        </div>
      )}
    </div>
  );
};
