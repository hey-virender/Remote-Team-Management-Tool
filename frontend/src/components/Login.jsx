import React, { useState } from "react";
import { useAuth } from "../context/ContextProviders";
import { useNavigate } from "react-router-dom";
import { FaRegEye } from "react-icons/fa";
import { TbEyeClosed } from "react-icons/tb";

const Login = () => {
  const { login } = useAuth();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(true);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    console.log("submit called at login");
    e.preventDefault();
    await login(email, password);
    navigate("/");
  };

  return (
    <div className="xs:h-full md:h-screen md:pt-4">
      <h2 className="text-center text-white font-semibold xs:text-lg md:text-2xl ">
        Log In with your Credentials
      </h2>
      <form
        onSubmit={handleSubmit}
        className="flex flex-col items-center gap-6 bg-gray-800 mx-auto rounded-xl xs:h-full xs:pt-16 md:w-2/4 md:h-96 md:mt-4 md:p-12"
      >
        <label className="border-2 border-gray-700 text-white  w-80 px-4 py-2 rounded-xl">
          Email:
          <input
            className="outline-none bg-transparent text-white  pl-2"
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </label>
        <label className="border-2 border-gray-700  text-white w-80 px-4 py-2 rounded-xl relative">
          Password:
          <input
            className="outline-none bg-transparent  text-white pl-2"
            type={showPassword ? "text" : "password"}
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
          <div
            className="absolute right-3 top-3"
            onClick={() => setShowPassword(!showPassword)}
          >
            {showPassword ? <FaRegEye /> : <TbEyeClosed />}
          </div>
        </label>
        <button
          className="bg-green-500 rounded-xl  font-semibold w-24 py-1"
          type="submit"
        >
          Login
        </button>
      </form>
    </div>
  );
};

export default Login;
