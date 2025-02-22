import React, { useContext, useState } from "react";
import { Authcontext } from "../../shared Component/Authprovider/Authprovider";
import Swal from "sweetalert2";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import { Link, useNavigate } from "react-router-dom";
import { Player } from "@lottiefiles/react-lottie-player";
import animation from '../../../public/animation.json'


const RegisterPage = () => {
  const { googleLogin, userCreated, resetPassword } = useContext(Authcontext);
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const navigate = useNavigate(); // useNavigate hook to navigate after login

  const validatePassword = (password) => {
    const strongPasswordRegex =
      /^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;
    return strongPasswordRegex.test(password);
  };

  const handelRegister = (event) => {
    event.preventDefault();
    const form = event.target;
    const username = form.username.value;
    const photo = form.photo.value;
    const email = form.email.value;
    const password = form.password.value;
    const confirmpaddword = form.confirmpaddword.value;

    if (!validatePassword(password)) {
      Swal.fire({
        title: "Password is not strong enough!",
        text: "Must be at least 8 characters, include a number, a letter, and a special character.",
        icon: "error",
      });
      return;
    }

    if (password !== confirmpaddword) {
      Swal.fire({
        title: "Passwords do not match!",
        icon: "error",
      });
      return;
    }

    userCreated(email, password)
      .then((result) => {
        result.user
          .updateProfile({
            displayName: username,
            photoURL: photo,
          })
          .then(() => {
            Swal.fire({
              title: "Successfully Registered!",
              icon: "success",
              draggable: true,
            });
            navigate("/");
          })
          .catch((error) => {
            console.error("Error updating profile:", error);
          });
      })
      .catch((error) => {
        console.log("Error during registration:", error);
      });
  };

  const handleForgotPassword = () => {
    const email = prompt("Please enter your registered email:");
    if (email) {
      resetPassword(email)
        .then(() => {
          Swal.fire({
            title: "Reset Link Sent!",
            text: "Check your email to reset your password.",
            icon: "success",
          });
        })
        .catch((error) => {
          console.error("Error sending reset link:", error);
        });
    }
  };

  const handelGoogleLogin = () => {
    googleLogin()
      .then((result) => {
        console.log(result);
        // Navigate to home page after Google login
        navigate("/addTask"); // Adjust this route based on your app structure

        // SweetAlert success message
        Swal.fire({
          title: "Successfully Logged In with Google!",
          icon: "success",
          draggable: true,
        });
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
    <div className="p-10 mb-10 shadow-lg rounded-lg flex items-center justify-center">
      <div className="max-w-[800px] w-full bg-white/10 bg-opacity-10 backdrop-blur-lg rounded-lg shadow-lg p-8 text-white">
        <h1 className="text-2xl font-bold text-center mb-6">Register</h1>
        <form onSubmit={handelRegister} className="p-8">
          <div className="grid md:grid-cols-2 gap-5">
            {/* Username Field */}
            <div className="mb-4">
              <label
                htmlFor="username"
                className="block mb-2 text-sm font-normal"
              >
                Username
              </label>
              <input
                type="text"
                name="username"
                id="username"
                className="w-full bg-white/10 px-3 py-2 bg-gray-700 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500"
                placeholder="Enter your username"
              />
            </div>

            {/* Photo URL */}
            <div className="mb-4">
              <label htmlFor="photo" className="block mb-2 text-sm">
                Photo URL
              </label>
              <input
                type="text"
                name="photo"
                id="photo"
                className="w-full px-3 py-2 bg-white/10 bg-gray-700 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500"
                placeholder="Photo URL"
              />
            </div>
          </div>

          {/* Email Field */}
          <div className="mb-4">
            <label htmlFor="email" className="block mb-2 text-sm ">
              Email
            </label>
            <input
              type="email"
              name="email"
              id="email"
              className="w-full px-3 py-2 bg-white/10 bg-gray-700 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500"
              placeholder="Enter your email"
            />
          </div>

          <div className="grid md:grid-cols-2 gap-5">
            {/* Password Field */}
            <div className="mb-4">
              <label
                htmlFor="password"
                className="block mb-2 text-sm"
              >
                Password
              </label>
              <div className="relative">
                <input
                  type={showPassword ? "text" : "password"}
                  name="password"
                  id="password"
                  className="w-full px-3 py-2 bg-white/10 bg-gray-700 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500"
                  placeholder="Enter your password"
                />
                <div
                  className="absolute inset-y-0 right-3 flex items-center cursor-pointer"
                  onClick={() => setShowPassword(!showPassword)}
                >
                  {showPassword ? <FaEyeSlash /> : <FaEye />}
                </div>
              </div>
            </div>

            {/* Confirm Password Field */}
            <div className="mb-4">
              <label
                htmlFor="confirm-password"
                className="block mb-2 text-sm"
              >
                Confirm Password
              </label>
              <div className="relative">
                <input
                  type={showConfirmPassword ? "text" : "password"}
                  name="confirmpaddword"
                  id="confirm-password"
                  className="w-full px-3 py-2 bg-gray-700 rounded-lg bg-white/10 focus:outline-none focus:ring-2 focus:ring-purple-500"
                  placeholder="Confirm your password"
                />
                <div
                  className="absolute inset-y-0 right-3 flex items-center cursor-pointer"
                  onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                >
                  {showConfirmPassword ? <FaEyeSlash /> : <FaEye />}
                </div>
              </div>
            </div>
          </div>

          {/* Register Button */}
          <button
            onClick={handleForgotPassword}
            className="text-sm text-blue-300 hover:underline mt-4 block text-center mb-5"
          >
            Forgot Password?
          </button>
          <button
            type="submit"
            className="w-full py-2 mb-3 bg-purple-600 hover:bg-purple-700 bg-white/10 rounded-lg text-white font-semibold"
          >
            Register
          </button>

          <p>Already Have An Account?{" "}
            <Link to={'/login'}>
              <span className="text-blue-500">Login</span>
            </Link>
          </p>

        </form>

        <div className="divider">or</div>

        {/* Google Login Button */}
        <div onClick={handelGoogleLogin} className="mt-2 px-8">
          <button className="w-full py-2 text-white font-semibold bg-blue-400 rounded-md bg-white/10">
            Google Login
          </button>
        </div>
      </div>


      <div className='hidden ml-8 lg:block'>
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

export default RegisterPage;




