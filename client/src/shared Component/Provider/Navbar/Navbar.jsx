import React, { useContext, useState } from "react";
import { NavLink, Link, useNavigate, Outlet } from "react-router-dom";
import { FaHome } from "react-icons/fa";
import { AiOutlineLogin } from "react-icons/ai";
import { Authcontext } from "../../Authprovider/Authprovider";

const Navbar = () => {
  const { user, userLogOut } = useContext(Authcontext);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const navigate = useNavigate();

  const handleLogOut = () => {
    userLogOut().then(() => {
      navigate("/login");
    });
  };

  const linkClass = "relative text-white px-4 ml-5 py-[3px] flex items-center";
  const activeClass = "after:absolute after:left-0 after:bottom-0 after:h-[2px] after:bg-[#00C2FF] after:w-full after:scale-x-100 after:origin-left after:transition-transform after:duration-300";
  const hoverClass = "hover:after:absolute hover:after:left-0 hover:after:bottom-0 hover:after:h-[2px] hover:after:bg-[#00C2FF] hover:after:w-full hover:after:scale-x-100 hover:after:origin-left hover:after:transition-transform hover:after:duration-300 hover:after:scale-x-0";

  const linksNotUser = (
    < >
      <NavLink
        className={({ isActive }) =>
          `${linkClass} ${isActive ? activeClass : hoverClass}`
        }
        to="/"
      >
         Home
      </NavLink>
      <NavLink
        className={({ isActive }) =>
          `${linkClass} ${isActive ? activeClass : hoverClass}`
        }
        to="/"
      >
        Add Task
      </NavLink>
      <NavLink
        className={({ isActive }) =>
          `${linkClass} ${isActive ? activeClass : hoverClass}`
        }
        to="/manageTask"
      >
       Manage Task
      </NavLink>
    
    </>
  );

  const links = (
    <>
      <NavLink
        className={({ isActive }) =>
          `${linkClass} ${isActive ? activeClass : hoverClass}`
        }
        to="/"
      >
        Add Task
      </NavLink>
      <NavLink
        className={({ isActive }) =>
          `${linkClass} ${isActive ? activeClass : hoverClass}`
        }
        to="/manageTask"
      >
       Manage Task
      </NavLink>
    
    </>
  );

  return (
    <div>
      <div className="bg-white/10 backdrop-blur-3xl shadow-lg fixed top-0 left-0 right-0 z-50 opacity-95">
        <div className="container w-11/12 mx-auto ">
          <div className="navbar flex justify-between items-center ">
            {/* Mobile Menu Toggle */}
            <div className="flex lg:hidden">
              <button
                onClick={() => setIsMenuOpen(!isMenuOpen)}
                className="btn btn-square btn-ghost"
              >
                {isMenuOpen ? (
                  <svg
                    className="w-6 h-6"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M6 18L18 6M6 6l12 12"
                    ></path>
                  </svg>
                ) : (
                  <svg
                    className="w-6 h-6"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M4 6h16M4 12h16M4 18h16"
                    ></path>
                  </svg>
                )}
              </button>
            </div>

            {/* Logo */}
            <div className="flex-shrink-0">
            <Link to="/manageTask" className="text-white"> Task Management</Link>
            </div>

            {/* Links */}
            <div className="hidden lg:flex">{user?.email ? links : linksNotUser}</div>

            {/* User Menu */}
            <div className="flex">
              {!user?.email ? (
               <div className="flex">
                 <Link
                  className="border mr-5 text-[#00C2FF] font-bold px-3 py-[3px] rounded-md flex items-center"
                  to="/login"
                >
                  <AiOutlineLogin className="text-lg mr-2" /> Log In
                </Link>
                 <Link
                  className="border text-[#00C2FF] font-bold px-3 py-[3px] rounded-md flex items-center"
                  to="/register"
                >
                  <AiOutlineLogin className="text-lg mr-2" /> Register now
                </Link>
               </div>
              ) : (
                <div className="relative">
                  <div
                    role="button"
                    className="btn btn-ghost btn-circle avatar"
                    onClick={() => setIsDropdownOpen(!isDropdownOpen)}
                  >
                    <div className="w-10 rounded-full">
                      <img
                        referrerPolicy="no-referrer"
                        alt="User Avatar"
                        src={
                          (user && user.photoURL) ||
                          "https://i.ibb.co.com/0nvdFb5/Screenshot-54.png"
                        }
                      />
                    </div>
                  </div>
                  {isDropdownOpen && (
                    <ul
                      className="absolute right-0 mt-2 menu bg-base-100 rounded-box z-[10] w-52 p-2 shadow"
                    >
                      <li>
                        <a className="justify-between">
                          Profile <span className="badge">New</span>
                        </a>
                      </li>
                      <li>
                        <a>Settings</a>
                      </li>
                      <li>
                        <button onClick={handleLogOut}>Logout</button>
                      </li>
                    </ul>
                  )}
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Responsive Mobile Menu */}
        {isMenuOpen && (
          <div className="lg:hidden">
            <div className="menu  space-y-2 px-4 py-2">
              {user?.email ? links : linksNotUser}
            </div>
          </div>
        )}
      </div>

      <div className="pt-[50px]"></div>
      <div>
      
      </div>
    </div>
  );
};

export default Navbar;








