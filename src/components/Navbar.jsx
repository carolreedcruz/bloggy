import "../index.css";
import React from 'react'

const Navbar = () => {
  return (
    <div className="sticky top-0 z-50 bg-black shadow-sm border py-4 ">
      <nav className="flex items-center">
        <img src="bloggy.png" className="w-[100px] h-[30px] ms-7" alt="logo"/>
        
      </nav>
    </div>
  )
}

export default Navbar

