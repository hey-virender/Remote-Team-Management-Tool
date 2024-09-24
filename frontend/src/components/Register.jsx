import React, { useState } from "react";
import { useAuth } from "../context/ContextProviders";
import { useNavigate } from "react-router-dom";
import { FaRegEye } from "react-icons/fa";
import { TbEyeClosed } from "react-icons/tb";

const Register = () => {
  const { register } = useAuth();
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [showPassword, setShowPassword] = useState(true);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    await register(username, email, password, confirmPassword);
    navigate("/");
  };

  return (
    <div className="lg:pt-8">
      <h2 className="text-center text-white font-semibold lg:text-2xl ">
        Register
      </h2>
      <form
        onSubmit={handleSubmit}
        className="flex flex-col items-center   bg-gray-800 mx-auto rounded-xl lg:gap-4 lg:h-80  lg:mt-4 lg:w-2/4 lg:px-12 lg:py-3 "
      >
        <label className="border-2 border-gray-700 lg:w-96 lg:px-4 py-2 rounded-xl">
          Name:
          <input
            className="outline-none bg-transparent text-gray-700 lg:pl-2"
            type="text"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            required
          />
        </label>
        <label className="border-2 border-gray-700 lg:w-96 lg:px-4 py-2 rounded-xl">
          Email:
          <input
            className="outline-none bg-transparent text-gray-700 lg:pl-2"
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </label>
        <label className="relative border-2 border-gray-700 lg:w-96 lg:px-4 py-2 rounded-xl">
          Password:
          <input
            className="outline-none bg-transparent text-gray-700 lg:pl-2"
            type={showPassword ? "text" : "password"}
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
          <div
            className="absolute right-3 lg:top-3"
            onClick={() => setShowPassword(!showPassword)}
          >
            {showPassword ? <FaRegEye /> : <TbEyeClosed />}
          </div>
        </label>
        <label className="border-2 border-gray-700 lg:w-96 lg:px-4 py-2 rounded-xl">
          Confirm Password:
          <input
            className="outline-none bg-transparent text-gray-700 lg:pl-2"
            type={showPassword ? "text" : "password"}
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            required
          />
        </label>
        <button
          className="bg-green-500 rounded-xl text-black font-semibold lg:w-24 lg:py-1"
          type="submit"
        >
          Register
        </button>
      </form>
    </div>
  );
};

export default Register;
