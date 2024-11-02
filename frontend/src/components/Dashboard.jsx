import React, { useEffect, useState } from "react";
import TaskList from "./TaskList";
import NotificationsComponent from "./NotificationsComponent";
import {
  useAuth,
  useNotifications,
  useTaskContext,
} from "../context/ContextProviders";
import { FaBell } from "react-icons/fa";
import TaskDetails from "./TaskDetails";

function Dashboard() {
  const { user, logout } = useAuth();
  const { showTaskDetails, showNotifications, setShowNotifications } =
    useTaskContext();
  const { newNotification } = useNotifications();
 

  return (
    <div className="font-poppins relative p-4 bg-black text-white h-screen overflow-hidden scrollbar-hidden">
      <div className="flex justify-between">
        <h1 className="text-xl font-bold mb-4 text-white">Dashboard</h1>
        <div className="flex items-center gap-3">
          <button
            className={`relative ${showNotifications ? "disabled" : null}`}
            onClick={() => setShowNotifications(!showNotifications)}
          >
            <FaBell className="text-purple-600 lg:h-6 lg:w-6 " />
            {newNotification && (
              <div className="absolute bg-red-500 -top-1 -right-2 h-3 w-3 rounded-full"></div>
            )}
          </button>
          <div className="md:h-10 md:w-10 rounded-full bg-green-400"></div>
          <h1 className="capitalize font-semibold text-white">{user.name}</h1>
          <button
            className="capitalize font-medium bg-red-500 p-1 rounded-xl text-white"
            onClick={logout}
          >
            Logout
          </button>
        </div>
      </div>

      <div className="">
        {showNotifications && (
          <NotificationsComponent setShowNotifications={setShowNotifications} />
        )}
        {showTaskDetails ? <TaskDetails /> : <TaskList />}
      </div>
    </div>
  );
}

export default Dashboard;
