import React, { useContext, useState } from "react";
import { Button, Table } from "reactstrap";
import PostModal from "./components/modal";
import { PostContext } from "./context/post";

export default function App() {
  const [isOpen, setIsOpen] = useState(false);
  const [mode, setMode] = useState("Add");
  const [id, setId] = useState(null);
  const [post, setPost] = useState({
    title: "",
    body: "",
    userId: null,
  });
  const { posts, onAdd, onEdit, onDelete } = useContext(PostContext);

  const onChange = (e) => setPost({ ...post, [e.target.name]: e.target.value });

  const onSubmit = () => {
    setIsOpen(false);
    if (mode === "Edit") {
      onEdit({ id, ...post });
      return;
    }
    if (mode === "Delete") {
      onDelete(id);
      return;
    }
    onAdd(post);
  };

  return (
    <div className="app">
      <div className="d-flex align-items-center justify-content-between my-3">
        <div>
          <h3>JPH</h3>
        </div>
        <div>
          <Button
            color="primary"
            onClick={() => {
              setPost({});
              setMode("Add");
              setIsOpen(true);
            }}
          >
            Add Post
          </Button>
        </div>
      </div>
      <div className="table-wrapper">
        {posts.length ? (
          <Table>
            <thead>
              <tr>
                <th>ID</th>
                <th>Title</th>
                <th>Body</th>
                <th>User ID</th>
                <th></th>
                <th></th>
              </tr>
            </thead>
            <tbody>
              {posts.map((item) => (
                <tr key={item.id}>
                  <td>{item.id}</td>
                  <td>{item.title}</td>
                  <td>{item.body}</td>
                  <td>{item.userId}</td>
                  <td>
                    <Button
                      onClick={() => {
                        setId(item.id);
                        setPost(item);
                        setMode("Edit");
                        setIsOpen(true);
                      }}
                    >
                      Edit
                    </Button>
                  </td>
                  <td>
                    <Button
                      color="danger"
                      onClick={() => {
                        setId(item.id);
                        setMode("Delete");
                        setIsOpen(true);
                      }}
                    >
                      Delete
                    </Button>
                  </td>
                </tr>
              ))}
            </tbody>
          </Table>
        ) : (
          <p>No post yet...</p>
        )}
      </div>
      <PostModal
        isOpen={isOpen}
        mode={mode}
        post={post}
        onChange={onChange}
        toggle={() => setIsOpen(!isOpen)}
        onSubmit={onSubmit}
      />
    </div>
  );
}

// https://codesandbox.io/s/ey0w4?file=/src/styles.css:68-83
