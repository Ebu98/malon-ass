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

        // import React, { useState, useEffect } from 'react';

        // const PaginatedDataComponent = () => {
        //   const [data, setData] = useState([]);
        //   const [currentPage, setCurrentPage] = useState(1);
        //   const [loading, setLoading] = useState(false);
        
        //   useEffect(() => {
        //     const fetchData = async () => {
        //       setLoading(true);
        //       try {
        //         const response = await fetch(`https://api.example.com/data?page=${currentPage}`);
        //         const json = await response.json();
        //         setData(json.data);
        //       } catch (error) {
        //         console.error('Error:', error);
        //       } finally {
        //         setLoading(false);
        //       }
        //     };
        
        //     fetchData();
        //   }, [currentPage]);
        
        //   const handlePreviousPage = () => {
        //     if (currentPage > 1) {
        //       setCurrentPage(currentPage - 1);
        //     }
        //   };
        
        //   const handleNextPage = () => {
        //     setCurrentPage(currentPage + 1);
        //   };
        
        //   return (
        //     <div>
        //       {loading ? (
        //         <p>Loading...</p>
        //       ) : (
        //         <>
        //           <table>
        //             <thead>
        //               <tr>
        //                 <th>Name</th>
        //                 <th>IGG</th>
        //                 <th>Email</th>
        //               </tr>
        //             </thead>
        //             <tbody>
        //               {data.map((item) => (
        //                 <tr key={item.id}>
        //                   <td>{item.name}</td>
        //                   <td>{item.igg}</td>
        //                   <td>{item.email}</td>
        //                 </tr>
        //               ))}
        //             </tbody>
        //           </table>
        
        //           <div>
        //             <button onClick={handlePreviousPage} disabled={currentPage === 1}>
        //               Previous
        //             </button>
        //             <button onClick={handleNextPage}>Next</button>
        //           </div>
        //         </>
        //       )}
        //     </div>
        //   );
        // };
        
        // export default PaginatedDataComponent;
        