// src/context/TaskContext.js
import React, { createContext, useState, useContext, useEffect } from "react";
import PropTypes from "prop-types";
import { getTasks } from "../api/taskService";
export const TaskContext = createContext();

export const TaskProvider = ({ children }) => {
  const [tasks, setTasks] = useState([]);
  const [currentTask, setCurrentTask] = useState(null);
  const [selectedTask, setSelectedTask] = useState(null);
  const [showTaskDetails, setShowTaskDetails] = useState(false);
  const [showCreateTask, setShowCreateTask] = useState(false);
  const [showNotifications, setShowNotifications] = useState(false);



  return (
    <TaskContext.Provider
      value={{
        tasks,
        setTasks,
        selectedTask,
        setSelectedTask,
        setShowTaskDetails,
        showCreateTask,
        setShowCreateTask,
        currentTask,
        setCurrentTask,
        showNotifications,
        setShowNotifications,
        showTaskDetails,
      }}
    >
      {children}
    </TaskContext.Provider>
  );
};

TaskProvider.propTypes = {
  children: PropTypes.node.isRequired,
};
