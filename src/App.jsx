import React from "react";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Articles from "./components/Articles";
import AddArticle from "./components/AddArticle";

function App() {
  return (
    <div className="flex flex-row w-full p-4">
      <div className="flex flex-col w-full md:w-3/4 lg:w-2/3 p-4">
        <Articles />
      </div>
      <div className="flex items-center w-full md:w-1/4 lg:w-1/3 p-4">
        <AddArticle />
      </div>
      <ToastContainer />
    </div>
  );
}

export default App;
