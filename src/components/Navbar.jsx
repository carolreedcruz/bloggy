
import "../index.css";
import React from 'react';
import { Link } from "react-router-dom";
import { useAuthState } from "react-firebase-hooks/auth";
import { auth } from "../firebase";
import { signOut } from "firebase/auth";

const Navbar = () => {
  const [user] = useAuthState(auth);



  return (
    <div className="sticky top-0 z-50 bg-black shadow-sm py-4">
      <nav className="flex items-center justify-between px-4">
        <img src="bloggy.png" className="w-[100px] h-[30px]" alt="logo"/>
        <Link className="text-white text-xl font-bold hover:text-yellow-300 absolute left-1/2 transform -translate-x-1/2" to="/">Home</Link>
        <div className="flex items-center space-x-4">
          {user && (
            <>
              <span className="text-white font-bold">
                Signed in as: <span className="font-normal">{user.displayName || user.email}</span>
              </span>
              <button
                onClick={() =>{signOut(auth)}}
                className="bg-yellow-300 text-black px-3 py-2 rounded-lg shadow-md hover:bg-yellow-400 focus:outline-none"
              >
                Log Out
              </button>
            </>
          )}
        </div>
      </nav>
    </div>
  );
};

export default Navbar;



