import React, { useState } from "react";
import { AiFillEye, AiOutlineEyeInvisible } from "react-icons/ai";
import { useNavigate, useParams } from "react-router-dom";
import axios from "axios";
import { toast } from "react-toastify";
import Header from "../layout/header/Header";

const ResetPassword = () => {
  const [visible, setVisile] = useState(false); // display typing password
  const navigate = useNavigate();
  const { active_token } = useParams();
  const [password, setPassword] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (active_token) {
        await axios.patch(
          `https://ecomserver-9b4w.onrender.com/api/user/resetPassword/${active_token}`,
          { password },
        );
        toast.success("Reset Password Successfully");
        navigate("/login");
      }
    } catch (err) {
      toast.error(err.response.data.message);
    }
  };

  return (
    <>
      <div className=" min-h-screen bg-gray-50 flex flex-col justify-center -mt-3  sm:px-6 lg:px-8">
        <div className="sm:mx-auto sm:w-full sm:max-w-md">
          <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900">
            New password
          </h2>
        </div>

        <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-md">
          <div className="bg-white py-8 px-4 shadow sm:rounded-lg sm:px-10">
            <form className="space-y-6" onSubmit={handleSubmit}>
              <div>
                <label
                  htmlFor="password"
                  className="block text-sm font-medium text-gray-700"
                >
                  Password
                </label>

                <div className="mt-1 relative">
                  <input
                    type={visible ? "text" : "password"}
                    name="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    autoComplete="current-password"
                    required
                    className="appearance-none block w-full px-3 py-2 border 
                  border-gray-300 rounded-md shadow-sm placeholder-gray-400 
                  focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                  />

                  {/* btn display */}
                  {visible ? (
                    <AiFillEye
                      className="absolute right-2 top-2 cursor-pointer"
                      size={25}
                      onClick={() => setVisile(false)}
                    />
                  ) : (
                    <AiOutlineEyeInvisible
                      className="absolute right-2 top-2 cursor-pointer"
                      size={25}
                      onClick={() => setVisile(true)}
                    />
                  )}
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
            </form>
          </div>
        </div>
      </div>
    </>
  );
};

export default ResetPassword;
