import React from "react";
import './AddUser.css'

export const AddUser = ({ onAdd }) => {
  const handleOnSubmit = (event) => {
    event.preventDefault();
    onAdd(event.target.title.value, event.target.body.value, event.target.userId.value);
    event.target.title.value = "";
    event.target.body.value = "";
    event.target.userId.value = ""
  };

  return (
      <div className="form-group">
    <form onSubmit={handleOnSubmit}>
      <h3>Add Post</h3>
      <section className="form-section">
      <input placeholder="Title" name="title" />
      <input placeholder="userid" name="userId" />
      <textarea placeholder="Body" name="body" />
      <button onSubmit={handleOnSubmit}>Add</button>
      </section>
      <hr />
    </form>
    </div>
  );
};
