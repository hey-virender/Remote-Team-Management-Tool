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
    <div className="xs:h-full md:h-screen md:pt-4">
      <h2 className="text-center text-white font-semibold xs:text-lg md:text-2xl  ">
        Register
      </h2>
      <form
        onSubmit={handleSubmit}
        className="flex flex-col items-center bg-gray-800 mx-auto rounded-xl xs:h-screen xs:gap-5 md:gap-4 md:h-96  md:mt-4 md:w-2/4 md:px-12 md:py-3 "
      >
        <label className="border-2 border-gray-700 text-white xs:w-72 xs:px-1 md:w-96 md:px-4 py-2 rounded-xl">
          Name:
          <input
            className="outline-none bg-transparent text-white  lg:pl-2"
            type="text"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            required
          />
        </label>
        <label className="border-2 border-gray-700 text-white xs:w-72 xs:px-1 md:w-96 md:px-4 py-2 rounded-xl">
          Email:
          <input
            className="outline-none bg-transparent text-white md:pl-2"
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </label>
        <label className="relative border-2 border-gray-700 text-white xs:w-72 xs:px-1 md:w-96 md:px-4 py-2 rounded-xl">
          Password:
          <input
            className="outline-none bg-transparent text-white pl-2"
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
        <label className="border-2 border-gray-700 text-white xs:w-72 md:w-96 md:px-4 py-2 rounded-xl">
          Confirm Password:
          <input
            className="outline-none bg-transparent text-white md:pl-2"
            type={showPassword ? "text" : "password"}
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            required
          />
        </label>
        <button
          className="bg-green-500 rounded-xl text-black font-semibold w-24 py-1"
          type="submit"
        >
          Register
        </button>
      </form>
    </div>
  );
};

export default Register;
