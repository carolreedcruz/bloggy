import React from "react";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Articles from "./components/Articles";
import AddArticle from "./components/AddArticle";
import Navbar from "./components/Navbar";
import "./index.css";

function App() {
  return (
    
    <div>
      <Navbar />
    <div className="flex justify-center p-4 bg-gray-100">
      
      <div className="flex flex-col w-full max-w-5xl p-4">
        <div className="flex flex-col md:flex-row">
          <div className="flex flex-col w-full md:w-2/3 p-4">
            <Articles />
          </div>
          <div className="flex items-center w-full md:w-1/3 p-4">
            <AddArticle />
          </div>
        </div>
      </div>
      <ToastContainer />
    </div>
    </div>
  );
}

export default App;
