import React, { createContext, useEffect, useState } from "react";
import PropTypes from "prop-types";
import { io } from "socket.io-client";

const socket = io("https://remote-team-management-tool-production.up.railway.app");
export const NotificationsContext = createContext();

export const NotificationsProvider = ({ children }) => {
  const [newNotification, setNewNotification] = useState();
  const [notifications, setNotifications] = useState([]);

  useEffect(() => {
    // Set up the socket event listener once when the component mounts
    socket.on("receiveNotification", (notification) => {
      setNotifications((prevNotifications) => [
        ...prevNotifications,
        notification,
      ]);
      console.log("Before setting newNotification to true");
      setNewNotification(true);
      console.log("After setting newNotification to true");
      console.log("After setting newNotification", newNotification);
    });

    // Clean up the event listener when the component unmounts
    return () => {
      socket.off("receiveNotification");
    };
  }, []);

  return (
    <NotificationsContext.Provider
      value={{
        newNotification,
        setNewNotification,
        notifications,
        setNotifications,
      }}
    >
      {children}
    </NotificationsContext.Provider>
  );
};

NotificationsProvider.propTypes = {
  children: PropTypes.node.isRequired,
};
