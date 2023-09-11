import React, { useState } from "react";
import { AiFillEye, AiOutlineEyeInvisible } from "react-icons/ai";
import styles from "../../styles/styles";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { useDispatch } from "react-redux";
import axios from "axios";
import userSlice from "../../tookit/user/userSlice";

const Login = () => {
  const [visible, setVisile] = useState(false); // display typing password
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const dispatch = useDispatch();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post("/user/login", { email, password }).then((res) => {
        const { name, email, avatar } = res.data.user;
        dispatch(userSlice.actions.setUser({ name, email, avatar }));
        toast.success(res.data.message);
        navigate("/");
      });
    } catch (err) {
      toast.error(err.response.data.message);
    }
  };

  return (
    <>
      <div className=" min-h-screen bg-gray-50 flex flex-col justify-center -mt-3  sm:px-6 lg:px-8">
        <div className="sm:mx-auto sm:w-full sm:max-w-md">
          <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900">
            Login to your account
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

              <div className={`${styles.noramlFlex} justify-between`}>
                <div className="text-sm">
                  <Link
                    to="/user/forgot"
                    className="font-medium text-blue-600 hover:text-blue-500"
                  >
                    Forgot your password
                  </Link>
                </div>
              </div>

              <div>
                <button
                  type="submit"
                  className="group relative w-full h-[40px] flex justify-center px-4 py-1 border border-transparent text-2xl font-medium rounded-md text-blue-800 bg-blue-600 hover:bg-blue-700 hover:text-white"
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

export default Login;
