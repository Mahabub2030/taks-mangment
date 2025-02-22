import React from "react";
import { CgFacebook } from "react-icons/cg";
import { BsInstagram, BsLinkedin, BsTwitter } from "react-icons/bs";
import { Link } from "react-router-dom";
const Footer = () => {
  return (
    <div className="bg-[#1a0b2e] text-white">
      <div className="mx-auto container w-11/12  ">
        <footer className=" w-full p-6 lg:p-9">
          <div className="flex justify-between gap-[30px] flex-wrap w-full bg-[#1a0b2e] ">
            <div className="">
              <h3 className="text-[1.2rem] font-semibold text-text mb-2">
                Company
              </h3>
              <div className="flex  flex-col gap-[10px]">
                <Link to="/avilableCar">
                  <p className="text-[0.9rem] text-text hover:text-primary cursor-pointer transition-all duration-200">
                    AvilableCar
                  </p>
                </Link>
               
                <p className="text-[0.9rem] text-text hover:text-primary cursor-pointer transition-all duration-200">
                  Our Team
                </p>

                <Link to={"/contactus"}>
                  <p className="text-[0.9rem] text-text hover:text-primary cursor-pointer transition-all duration-200">
                    Contact Us
                  </p>
                </Link>
              </div>
            </div>

            <div className="">
              <h3 className="text-[1.2rem] font-semibold text-text mb-2">
                Our Social Media
              </h3>
              <div className="flex       flex-col gap-[10px]">
                <a
                  target="_blank"
                  href="https://www.facebook.com/md.ferdous.hossen.786069"
                >
                  {" "}
                  <p className="text-[0.9rem] text-text hover:text-primary cursor-pointer transition-all duration-200">
                    Facebook
                  </p>
                </a>
                <a target="_blank" href="https://www.linkedin.com/">
                  {" "}
                  <p className="text-[0.9rem] text-text hover:text-primary cursor-pointer transition-all duration-200">
                    Linkedin
                  </p>
                </a>
                <a target="_blank" href="https://www.youtube.com/">
                  {" "}
                  <p className="text-[0.9rem] text-text hoer:text-primary cursor-pointer transition-all duration-200">
                    Youtube
                  </p>
                </a>
                <a target="_blank" href="https://x.com/?lang=en">
                  {" "}
                  <p className="text-[0.9rem] text-text hoer:text-primary cursor-pointer transition-all duration-200">
                    Twitter
                  </p>
                </a>
                <a target="_blank" href="https://www.instagram.com/">
                  {" "}
                  <p className="text-[0.9rem] text-text hoer:text-primary cursor-pointer transition-all duration-200">
                    Instagram
                  </p>
                </a>
              </div>
            </div>

            <div className="">
              <h3 className="text-[1.2rem] font-semibold text-text mb-2">
                Join a Newsletter
              </h3>
              <div className="flex gap-[2px] flex-col text-text relative">
                <label className="text-[0.9rem]">Your Email</label>
                <input
                  type="email"
                  className="py-2 px-4 w-full pr-[90px] rounded-md border border-primary outline-none"
                  placeholder="Email address"
                />

                <button className="px-4 h-[61%] rounded-r-md bg-primary text-white absolute top-[24px] right-0">
                  Submit
                </button>
              </div>
            </div>
          </div>

          <div className="border-t border-gray-200 pt-[20px] mt-[40px] flex items-center justify-between w-full flex-wrap gap-[20px]">
            <img
              className="w-[120px]"
              src="https://i.ibb.co.com/XVnJ0dv/1e3f54f3-a1b0-425b-9f0e-c8494b5164a2.png"
              alt=""
            />

            <p className="text-[0.9rem] text-gray-600">
              © Renfify. All Rights Reserved.{" "}
            </p>

            <div className="flex items-center gap-[10px] text-text">
              <a target="_blank" href="https://www.facebook.com/md.ferdous.hossen.786069" className="text-[1.3rem] p-1.5 cursor-pointer rounded-full hover:text-white hover:bg-primary transition-all duration-300">
                <CgFacebook />
              </a>
              <a target="_blank" href="https://www.facebook.com/md.ferdous.hossen.786069" className="text-[1.2rem] p-1.5 cursor-pointer rounded-full hover:text-white hover:bg-primary transition-all duration-300">
                <BsTwitter />
              </a>
              <a target="_blank" href="https://www.facebook.com/md.ferdous.hossen.786069"  className="text-[1.2rem] p-1.5 cursor-pointer rounded-full hover:text-white hover:bg-primary transition-all duration-300">
                <BsInstagram />
              </a>
              <a target="_blank" href="https://www.facebook.com/md.ferdous.hossen.786069"  className="text-[1.2rem] p-1.5 cursor-pointer rounded-full hover:text-white hover:bg-primary transition-all duration-300">
                <BsLinkedin />
              </a>
            </div>
          </div>
        </footer>
      </div>
    </div>
  );
};

export default Footer;
