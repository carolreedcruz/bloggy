import React from "react";
import Navbar from "./components/Navbar";
import "./index.css";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Register from "./components/auth/Register";
import Login from "./components/auth/Login";
import EditArticle from "./components/EditArticle";
import Article from "./components/Article";
import Homepage from "./components/Homepage";
import PrivateRoute from "./components/auth/PrivateRoute";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

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
          <Route
            path="/edit/:id"
            element={
              <PrivateRoute>
                <EditArticle />
              </PrivateRoute>
            }
          />
        </Routes>
      </Router>
      <ToastContainer />
    </div>
  );
}

export default App;
