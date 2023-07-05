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



{/* <select value={bankName} onChange={(e) => setBankName(e.target.value)}>
        <option value="">Select Bank</option>
        {banks.map((bank) => (
          <option key={bank.value} value={bank.value}>
            {bank.name}
          </option>
        ))}
        </select> */}
        // https://www.figma.com/file/aNrYJS9BEwLmPU5z5ddPXZ/Login-%26-Signup-Screen-for-Web-(Community)?type=design&node-id=0-1&t=w8JnJGMNkR4Gs3y1-0

        import React, { useEffect } from 'react';

const MyComponent = () => {
  useEffect(() => {
    const postData = async () => {
      try {
        // Perform the POST request
        const postResponse = await fetch('https://api.example.com/post', {
          method: 'POST',
          body: JSON.stringify({}),
          headers: {
            'Content-Type': 'application/json',
          },
        });

        if (!postResponse.ok) {
          throw new Error('Failed to perform the POST request');
        }

        // Process the POST response
        const postData = await postResponse.json();

        // Call the two GET functions concurrently
        const [getResponse1, getResponse2] = await Promise.all([
          fetch('https://api.example.com/get1'),
          fetch('https://api.example.com/get2'),
        ]);

        if (!getResponse1.ok || !getResponse2.ok) {
          throw new Error('Failed to perform one or both GET requests');
        }

        // Process the GET responses
        const getData1 = await getResponse1.json();
        const getData2 = await getResponse2.json();

        // Handle the data
        console.log('POST data:', postData);
        console.log('GET data 1:', getData1);
        console.log('GET data 2:', getData2);

        // Perform further actions with the data...
      } catch (error) {
        console.error('Error:', error);
      }
    };

    postData();
  }, []);

  return <div>Component content</div>;
};

export default MyComponent;
