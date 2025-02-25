import { Player } from "@lottiefiles/react-lottie-player";
import axios from "axios";
import React, { useContext, useState } from "react";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import { Link, useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
import animation from "../../../public/animation.json";
import { Authcontext } from "../../shared Component/Authprovider/Authprovider";
const LoginPage = () => {
  const { userLogin, googleLogin } = useContext(Authcontext);
  const [showPassword, setShowPassword] = useState(false);
  const navigate = useNavigate();

  const handleLogin = (event) => {
    console.log("btn click");
    event.preventDefault();
    const from = event.target;
    const email = from.email.value;
    const password = from.password.value;

    const userInformation = {
      email,
      password,
    };

    userLogin(email, password)
      .then((result) => {
        
        console.log(result, "user email hobe ata ");
        const user = { email: result.user.email };
        // axios
        //   .post("https://assinment-eleven-server-site.vercel.app/", user, {
        //     withCredentials: true,
        //   })
          // .then((res) => console.log(res.data));

        // SweetAlert success message
        Swal.fire({
          title: "Successfully Logged In!",
          icon: "success",
          draggable: true,
        });

        navigate("/");
      })
      .catch((error) => {
        console.log("error", error);
        Swal.fire({
          title: "Login Failed",
          text: error.message,
          icon: "error",
          draggable: true,
        });
      });
  };

  const handelGoogleLogin = () => {
    googleLogin()
      .then((result) => {
        const name = result.user.displayName
        const email = (result.user.email);
        console.log(name,email);
        console.log(result);
        const userInformation = {
          name,
          email,
        }

        axios.post('https://server-pied-omega.vercel.app/user',userInformation)
        .then((res)=>console.log(res.data))

        // SweetAlert success message for Google login
        Swal.fire({
          title: "Successfully Logged In with Google!",
          icon: "success",
          draggable: true,
        });

        // Navigate to Home page after Google login
        navigate("/"); // Make sure '/home' is your correct home route
      })
      .catch((error) => {
        console.log(error);
        Swal.fire({
          title: "Google Login Failed",
          text: error.message,
          icon: "error",
          draggable: true,
        });
      });
  };

  return (
    <div className="h-[600px] mt-3 shadow-lg mb-5 rounded-lg flex items-center justify-center">
      <div className="max-w-[500px] w-full bg-white/10 bg-opacity-10 backdrop-blur-lg rounded-lg shadow-lg p-8 text-white">
        <h1 className="text-2xl font-bold text-center mb-6">Login</h1>
        <form onSubmit={handleLogin}>
          {/* Email Field */}
          <div className="mb-4">
            <label htmlFor="email" className="block mb-2 text-sm font-medium">
              Email
            </label>
            <input
              type="email"
              id="email"
              name="email"
              className="w-full px-3 py-2 bg-white/10 text-black rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500"
              placeholder="Enter your email"
            />
          </div>

          {/* Password Field with toggle */}
          <div className="mb-4">
            <label
              htmlFor="password"
              className="block mb-2 text-sm font-medium"
            >
              Password
            </label>
            <div className="relative">
              <input
                type={showPassword ? "text" : "password"} // Toggle between text and password type
                id="password"
                name="password"
                className="w-full px-3 py-2 bg-white/10 text-black rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500"
                placeholder="Enter your password"
              />
              <div
                className="absolute inset-y-0 right-3 flex items-center cursor-pointer"
                onClick={() => setShowPassword(!showPassword)} // Toggle the state
              >
                {showPassword ? <FaEyeSlash /> : <FaEye />}{" "}
                {/* Show/hide eye icon */}
              </div>
            </div>
          </div>

          {/* Remember Me and Forgot Password */}
          <div className="flex justify-between items-center mb-6">
            <div>
              <input type="checkbox" id="remember" />
              <label htmlFor="remember" className="ml-2 text-sm">
                Remember me
              </label>
            </div>
            <a href="#" className="text-sm hover:underline">
              Forgot Password?
            </a>
          </div>

          {/* Login Button */}
          <button
            type="submit"
            className="w-full py-2 bg-purple-600 hover:bg-purple-700 bg-white/10 rounded-lg text-white font-semibold"
          >
            Login
          </button>
        </form>

        {/* Register Link */}
        <p className="text-center text-sm mt-4">
          Don't have an account?{" "}
          <Link to="/register" className="text-blue-300 hover:underline">
            Register
          </Link>
        </p>

        {/* Google Login Button */}
        <button
          onClick={handelGoogleLogin}
          className="w-full py-2 mt-4 text-white font-semibold bg-blue-500 bg-white/10 rounded-lg"
        >
          Google Login
        </button>
      </div>

      <div className="hidden lg:block">
        <Player
          autoplay
          loop
          src={animation}
          style={{ height: "300px", width: "300px" }}
        ></Player>
      </div>
    </div>
  );
};

export default LoginPage;
