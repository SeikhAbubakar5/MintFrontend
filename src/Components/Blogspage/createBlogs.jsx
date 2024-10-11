import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { Box, Typography, TextField, Button } from "@mui/material";
import toast from "react-hot-toast";
import { API_BASE_URL } from "../../config";

const CreateBlogs = () => {
  const [formData, setFormData] = useState({
    title: "",
    image: "",
    subheading: "",
    content: "",
  });

  const navigate = useNavigate();

  const handleInputUpdate = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault(); 
    const token = localStorage.getItem("token");

    try {
      const res = await axios.post(
        `${API_BASE_URL}/blogs`, 
        formData,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      if (res.status === 201) {
        toast.success("Blog created successfully");
        navigate("/allblogs"); 
      }
    } catch (error) {
      if (error?.response?.data?.message) {
        toast.error(error.response.data.message);
      } else {
        toast.error("An error occurred while creating the blog");
      }
      console.error("Error:", error);
    }
  };

  return (
    <Box
      maxWidth={450}
      display="flex"
      flexDirection="column"
      alignItems="center"
      justifyContent="center"
      margin="auto"
      marginTop={5}
      padding={3}
      borderRadius={5}
      boxShadow="10px 10px 20px #ccc"
    >
      <Typography variant="h4" sx={{ textTransform: "uppercase" }} padding={3} textAlign="center">
        Create Blog
      </Typography>
      <form onSubmit={handleSubmit}>
        <TextField
          placeholder="Title"
          value={formData.title}
          onChange={handleInputUpdate}
          name="title"
          margin="normal"
          type="text"
          required
        />
        <TextField
          placeholder="Image URL"
          value={formData.image}
          onChange={handleInputUpdate}
          name="image"
          margin="normal"
          type="text"
          required
        />
        <TextField
          placeholder="Subheading"
          value={formData.subheading}
          onChange={handleInputUpdate}
          name="subheading"
          margin="normal"
          type="text"
          required
        />
        <TextField
          placeholder="Content"
          value={formData.content}
          onChange={handleInputUpdate}
          name="content"
          margin="normal"
          type="text"
          required
          multiline
          rows={4}
        />
        <Button
          type="submit"
          sx={{ borderRadius: 3, marginTop: 3 }}
          variant="contained"
          color="primary"
        >
          Submit
        </Button>
      </form>
    </Box>
  );
};

export default CreateBlogs;
