import React, { useState } from "react";
import styles from "../../styles/styles";
import { Link, useNavigate } from "react-router-dom";
import { AiFillEye, AiOutlineEyeInvisible } from "react-icons/ai";
import Header from "../layout/header/Header";
import axios from "axios";
import { toast } from "react-toastify";

const ForgotPassword = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post("/user/forgotPassword", { email });
      toast.success("Please check your email");
      navigate("/verify");
    } catch (err) {
      toast.error("Email not found");
    }
  };

  return (
    <>
      <div className=" min-h-screen bg-gray-50 flex flex-col justify-center -mt-3  sm:px-6 lg:px-8">
        <div className="sm:mx-auto sm:w-full sm:max-w-md">
          <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900">
            Reset your Password
          </h2>
        </div>

        <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-md">
          <div className="bg-white py-8 px-4 shadow sm:rounded-lg sm:px-10">
            <form className="space-y-6" onSubmit={handleSubmit}>
              <div>
                <label
                  htmlFor="email"
                  className="block text-sm font-medium text-gray-700"
                >
                  Email address
                </label>

                <div className="mt-1">
                  <input
                    type="email"
                    name="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    autoComplete="email"
                    required
                    className="appearance-none block w-full px-3 py-2 border 
                  border-gray-300 rounded-md shadow-sm placeholder-zinc-500 
                  focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                  />
                </div>
              </div>

              <div>
                <button
                  type="submit"
                  className="group relative w-full h-[40px] flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700"
                >
                  Submit
                </button>
              </div>

              <div className={`${styles.noramlFlex} w-full`}>
                <h4>Not have any account</h4>
                <Link to="/sign-up" className="text-blue-600 pl-2">
                  Sign up
                </Link>
              </div>
            </form>
          </div>
        </div>
      </div>
    </>
  );
};

export default ForgotPassword;
