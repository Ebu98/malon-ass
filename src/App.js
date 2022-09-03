import React, { useEffect, useState } from "react";
import { User } from "./components/User";
import { AddUser } from "./components/AddUser";


export default function App() {
  const [posts, setUsers] = useState([]);

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    await fetch('https://jsonplaceholder.typicode.com/users')
      .then((response) => response.json())
      .then((data) => setUsers(data))
      .catch((error) => console.log(error));
  };
  
  // fetch("https://jsonplaceholder.typicode.com/posts")
  // .then((response) => response.json())
  // .then((json) => console.log(json));

  const onAdd = async (id, title, body, userId) => {
    await fetch('https://jsonplaceholder.typicode.com/posts', {
      method: "POST",
      body: JSON.stringify({
        id: id,
        title: title,
        body: body,
        userId: userId,
      }),
      
      headers: {
        'Content-type': 'application/json; charset=UTF-8',
      }

    })
      .then((response) => {
        if (response.status !== 201) {
          return;
        } else {
          return response.json();
        }
      })
      .then((data) => {
        setUsers((posts) => [...posts, data]);
      })
      .catch((error) => console.log(error));
      
  };
  
  const onEdit = async (id, title, body, userId) => {
    await fetch(`https://jsonplaceholder.typicode.com/posts/${id}`, {
      method: "PUT",
      body: JSON.stringify({
        id: id,
        title: title,
        body: body,
        userId: userId,
      }),
      headers: {
        'Content-type': 'application/json; charset=UTF-8',
      }
    })
      .then((response) => {
        if (response.status !== 200) {
          return;
        } else {
          return response.json();
        }
      })
      
      .then((data) => {
        // setUsers((posts) => [...posts, data]);
        const updatedPosts = posts.map((post) => {
          if (post.id === id) {
            post.title = title;
            post.body = body;
            post.userId = userId;
          }
          return post;
          
        });
        setUsers((posts) => updatedPosts);
        
      })
      .catch((error) => console.log(error));
  };

  const onDelete = async (id) => {
    await fetch(`https://jsonplaceholder.typicode.com/posts/${id}`, {
      method: "DELETE"
    })
      .then((response) => {
        if (response.status !== 200) {
          return;
        } else {
          setUsers(
            posts.filter((post) => {
              return post.id !== id;
            })
          );
        }
      })
      .catch((error) => console.log(error));
  };

  return (
    <div className="App">
      <h1>Posts</h1>
      <AddUser onAdd={onAdd} />
      {posts.map((post) => (
        <User
          id={post.id}
          key={post.id}
          title={post.title}
          body={post.body}
          userId={post.userId}
          onEdit={onEdit}
          onDelete={onDelete}
        />
      ))}
    </div>
  );
}

// https://codesandbox.io/s/ey0w4?file=/src/styles.css:68-83


