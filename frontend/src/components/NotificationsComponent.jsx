import React, { useEffect, useState, useRef } from "react";
import io from "socket.io-client";
import api from "../api/axios";
import PropTypes from "prop-types";
import { useNotifications } from "../context/ContextProviders";

function NotificationsComponent({ setShowNotifications }) {
  const { notifications, setNotifications, setNewNotification } =
    useNotifications();

  const innerDivRef = useRef(null);

  useEffect(() => {
    console.log("fetching notifications...");
    api
      .get("/notifications")
      .then((response) => setNotifications(response.data))
      .catch((error) => console.error("Error fetching notifications:", error));

    // Socket event listeners
  }, []);

  useEffect(() => {
    function handleClickOutside(event) {
      if (innerDivRef.current && !innerDivRef.current.contains(event.target)) {
        // Timeout for avoiding conflict with Notification button
        setTimeout(() => {
          setShowNotifications(false);
          setNewNotification(false);
        }, 500);
      }
    }

    document.addEventListener("mousedown", handleClickOutside);

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [setShowNotifications, setNewNotification]);

  return (
    <div className="absolute z-50 left-0 flex justify-end   opacity bg-black bg-opacity-85 lg:px-4 lg:w-full lg:h-full ">
      <div
        ref={innerDivRef}
        className="p-4 bg-black rounded-xl  border-white  mb-4 scrollbar-hidden overflow-scroll lg:border-[0.1vw] lg:h-1/2 lg:w-2/5"
      >
        <h2 className="text-lg font-bold mb-2">Notifications</h2>
        <div className=" p-2 h-64 overflow-y-scroll scrollbar-hidden">
          {notifications.map((notif, index) => (
            <div key={index} className="p-2 mb-1 border-b lg:text-xs">
              {notif.title}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

NotificationsComponent.propTypes = {
  setShowNotifications: PropTypes.func.isRequired,
};

export default NotificationsComponent;
