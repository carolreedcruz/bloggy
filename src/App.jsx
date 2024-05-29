import React from "react";
import Navbar from "./components/Navbar";
import "./index.css";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Register from "./components/auth/Register";
import Login from "./components/auth/Login";
import EditArticle from "./components/EditArticle";
import Article from "./components/Article";
import Homepage from "./components/Homepage";

function App() {
  return (
    <div>
      <Router>
        <Navbar />
        <Routes>
          <Route path="/register" element={<Register />} />
          <Route path="/signin" element={<Login />} />
          <Route path="/article/:id" element={<Article />} />
          <Route path="/" element={<Homepage />} />
          <Route path="/edit/:id" element={<EditArticle />} />
        </Routes>
      </Router>
    </div>
  );
}

export default App;
