import React, { useState } from "react";
import Login from "../components/Login";
import Register from "../components/Register";
const AuthComponent = () => {
  const [showLogin, setShowLogin] = useState(true);
  return (
    <div className="bg-black relative h-screen font-poppins">
      {showLogin ? <Login /> : <Register />}

      <div
        className="absolute bg-slate-900 border-[0.06vw] border-black mx-auto rounded-full
        xs:bottom-28 xs:left-1/2 lg:bottom-10  -translate-x-1/2 w-52 h-12 mt-3 pb-3"
        onClick={() => {
          setShowLogin(!showLogin);
        }}
      >
        <div
          className={`absolute bg-green-500 text-black h-full max-w-3/5 w-3/5 min-w-3/5 rounded-full flex items-center justify-center  transition-all duration-300 ease-linear lg:text-xl lg:font-semibold  ${
            showLogin ? "translate-x-0 " : "translate-x-2/3 "
          }`}
        >
          {showLogin ? "Login" : "Register"}
        </div>
      </div>
    </div>
  );
};

export default AuthComponent;
