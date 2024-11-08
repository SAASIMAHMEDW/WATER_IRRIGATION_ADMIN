import React from "react";
import { Outlet } from "react-router-dom";  // This is where child routes will be rendered
import Navbar from "../components/Navbar";  // Import your Navbar component

const Home = () => {
  return (
    <div>
      {/* Navbar appears only once */}
      <Navbar />

      {/* Content will change based on the selected route (Data, Requests, Users) */}
      <div className="content">
        <Outlet />
      </div>
    </div>
  );
};

export default Home;
