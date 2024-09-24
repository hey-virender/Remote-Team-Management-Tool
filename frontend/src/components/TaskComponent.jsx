import React, { useState, useEffect } from "react";
import { useTaskContext } from "../context/ContextProviders";
import PropTypes from "prop-types";

const TaskComponent = ({ task }) => {
  const { setShowTaskDetails, setCurrentTask } = useTaskContext();

  const [textColor, setTextColor] = useState("text-white");

  function formatDate(dateString) {
    const date = new Date(dateString);
    const day = String(date.getDate()).padStart(2, "0");
    const month = String(date.getMonth() + 1).padStart(2, "0");
    const year = date.getFullYear();
    return `${day}/${month}/${year}`;
  }

  useEffect(() => {
    if (task.priority == "Low") {
      setTextColor("text-green-500");
    } else if (task.priority == "Medium") {
      setTextColor("text-yellow-500");
    } else if (task.priority == "High") {
      setTextColor("text-red-500");
    }
  }, [task]);

  return (
    <div
      className={`border-2 ${task.status == "Pending" && "border-yellow-600"} ${
        task.status == "Expired" && "border-red-600"
      } ${
        task.status == "Completed" && "border-green-600"
      } bg-gray-900 rounded-lg p-4 focus:border-purple-400 lg:h-40`}
      onClick={() => {
        setShowTaskDetails(true);
        setCurrentTask(task);
      }}
    >
      <div className="flex justify-between">
        <span>{task.title}</span>

        {task.dueDate && (
          <label
            className="flex flex-col text-red-500 lg:text-xs"
            htmlFor="dueDate"
          >
            Deadline
            <span id="dueDate" className="text-white lg:text-xs ">
              {formatDate(task.dueDate)}
            </span>
          </label>
        )}
      </div>
      <div className="flex lg:gap-3 lg:text-sm lg:mt-2">
        <div className={`${textColor}`}>Priority : {task.priority}</div>
        <div className="bg-white lg:w-[0.05vw]"></div>
        <div>Status: {task.status}</div>
      </div>

      <div className="text-gray-500 lg:text-xs lg:mt-2 lg:flex lg:gap-1 ">
        <div>Created : {formatDate(task.createdAt)}</div>
        <div className="bg-white lg:w-[0.05vw]"></div>
        <div className="text-white">
          Last Updated : {formatDate(task.createdAt)}
        </div>
      </div>
    </div>
  );
};

TaskComponent.propTypes = {
  task: PropTypes.object,
};

export default TaskComponent;
