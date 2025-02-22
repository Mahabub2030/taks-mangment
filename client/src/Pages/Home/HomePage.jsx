import React from "react";
import { Link, Outlet } from "react-router-dom";
import Navbar from "../../shared Component/Provider/Navbar/Navbar";

const HomePage = () => {
  return (
    <div>
      <Navbar></Navbar>

      <div className="flex">
        <div className="bg-white/10 rounded-b-md h-screen w-56 pt-10 p-2">
          <Link to={"/"}>
            <ul>
              <li className="hover:bg-blue-800 bg-blue-500 text-white rounded-sm text-center mb-2">AddTask</li>
            </ul>
          </Link>
          <Link to={"/manageTask"}>
            <ul>
              <li className="hover:bg-blue-800 bg-blue-500 text-white rounded-sm text-center mb-2">Manage Task</li>
            </ul>
          </Link>
        </div>

        <main className="min-h-[calc(100vh-10rem)] container mx-auto  w-11/12">
          <div className="pt-10 p-10">
            <Outlet></Outlet>
          </div>
        </main>
      </div>
    </div>
  );
};

export default HomePage;
