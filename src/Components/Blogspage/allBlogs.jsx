import React, { useState, useEffect } from "react";
import axios from "axios";
import { API_BASE_URL } from "../../config";

const Allblogs = () => {
  const [blogs, setBlogs] = useState([]);

  // Fetch all blogs
  const getAllBlogs = async () => {
    const token = localStorage.getItem("token");
    try {
      const { data } = await axios.get(`${API_BASE_URL}/blogs`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      if (data?.success) {
        setBlogs(data?.blogs);
      }
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getAllBlogs();
  }, []);

  return (
    <div>
      {blogs && blogs.length > 0 ? (
        blogs.map((blog) => (
          <div key={blog._id}>
            <h3>{blog.title}</h3>
           <img src={blog.image} alt="images" style={{ width: '50%', height: 'auto' }} />
            <h4>{blog.subheading}</h4>
            <p>{blog.content}</p>
            <p>Written by: {blog.user?.username}</p>
            <p>Published on: {new Date(blog.createdAt).toLocaleDateString()}</p>
          </div>
        ))
      ) : (
        <p>No blogs available</p>
      )}
    </div>
  );
};

export default Allblogs;
