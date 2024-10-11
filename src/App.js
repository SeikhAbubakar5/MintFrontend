import React from 'react';
import './App.css';
import {  Routes, Route } from "react-router-dom";
import Navbar from "./Components/Navbar/Navbar";
import Register from './Components/Register/Register';
import Login from './Components/Login/Login';
import Allblogs from './Components/Blogspage/allBlogs';

import CreateBlogs from './Components/Blogspage/createBlogs';

function App() {
  return (
    <>
    <Navbar/>

          <Routes>
              <Route path="/createBlogs" element={<CreateBlogs/>} />
              <Route path="/allblogs" element={<Allblogs/>} />
              <Route path="/login" element={<Login />} />
              <Route path="/register" element={<Register />} />
              
          </Routes>
      
    </>
  );
}

export default App;