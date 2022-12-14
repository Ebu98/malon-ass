import { createContext, useEffect, useState } from "react";

export const PostContext = createContext({});

const PostProvider = ({ children }) => {
  const [posts, setPosts] = useState([]);

  const fetchData = () => {
    fetch("https://jsonplaceholder.typicode.com/posts")
      .then((response) => response.json())
      .then((data) => setPosts(data))
      .catch((error) => console.log(error));
  };

  const onAdd = (values) => {
    fetch("https://jsonplaceholder.typicode.com/posts", {
      method: "POST",
      body: JSON.stringify(values),

      headers: {
        "Content-type": "application/json; charset=UTF-8",
      },
    })
      .then((response) => {
        if (response.status !== 201) {
          return;
        } else {
          return response.json();
        }
      })
      .then((data) => {
        const format = [data, ...posts].map((post, index) => {
          return { ...post, id: index + 1 };
        });
        setPosts(format);
      })
      .catch((error) => console.log(error));
  };

  const onEdit = (values) => {
    fetch(`https://jsonplaceholder.typicode.com/posts/${values.id}`, {
      method: "PATCH",
      body: JSON.stringify(values),
      headers: {
        "Content-type": "application/json; charset=UTF-8",
      },
    })
      .then((response) => {
        if (response.status !== 200) {
          return;
        } else {
          return response.json();
        }
      })

      .then((data) => {
        const format = posts.map((post) => {
          if (post.id === data.id) return data;
          return post;
        });
        setPosts(format);
      })
      .catch((error) => console.log(error));
  };

  const onDelete = (id) => {
    fetch(`https://jsonplaceholder.typicode.com/posts/${id}`, {
      method: "DELETE",
    })
      .then((response) => {
        if (response.status !== 200) {
          return;
        } else {
          const removePost = posts
            .filter((post) => {
              return post.id !== id;
            })
            .map((post, index) => {
              return { ...post, id: index + 1 };
            });
          setPosts(removePost);
        }
      })
      .catch((error) => console.log(error));
  };

  useEffect(() => {
    fetchData();
  }, []);

  return (
    <PostContext.Provider value={{ posts, onAdd, onEdit, onDelete }}>
      {children}
    </PostContext.Provider>
  );
};

export default PostProvider;
