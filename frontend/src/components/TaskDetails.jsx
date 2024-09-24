import React, { useState } from "react";
import { deleteTask, markTaskCompleted } from "../api/taskService";
import ChatComponent from "./ChatComponent";
import { useTaskContext } from "../context/ContextProviders";
import TaskForm from "./TaskForm";
import { CgCloseO } from "react-icons/cg";
import ConfirmationBox from "./ConfirmationBox";
const TaskDetails = () => {
  const {
    currentTask,
    setShowTaskDetails,
    showCreateTask,
    setShowCreateTask,
    setSelectedTask,
    tasks,
    setTasks,
  } = useTaskContext();

  const [confirmationStatus, setConfirmationStatus] = useState(false);
  const [showConfirmationBox, setShowConfirmationBox] = useState(false);

  const handleDelete = (id) => {
    deleteTask(id)
      .then(() => {
        setTasks(tasks.filter((currentTask) => currentTask._id !== id));
        setShowTaskDetails(false);
      })
      .catch((error) => console.error("Error deleting currentTask:", error));
  };

  const handleMarkAsCompleted = async (id) => {
    setShowConfirmationBox(true);

    // Wait for the user's decision (Yes or No)
    const confirmed = await new Promise((resolve) => {
      const handleConfirmationStatus = (status) => {
        resolve(status); // Resolve with the user's choice (true or false)
        setConfirmationStatus(null); // Reset the confirmation status
        setShowConfirmationBox(false); // Hide the confirmation box
      };

      // Temporary function to pass to the confirmation box
      setConfirmationStatus(() => handleConfirmationStatus);
    });

    // If the user confirmed (clicked Yes), mark the task as completed
    if (confirmed) {
      try {
        await markTaskCompleted(id);
        // Handle any additional logic after marking the task as completed
      } catch (error) {
        console.error("Error marking task as completed:", error);
      }
    }
  };

  if (!currentTask) return null;

  function formatDate(dateString) {
    const date = new Date(dateString);
    const day = String(date.getDate()).padStart(2, "0");
    const month = String(date.getMonth() + 1).padStart(2, "0");
    const year = date.getFullYear();
    return `${day}-${month}-${year}`;
  }

  return showCreateTask ? (
    <TaskForm />
  ) : (
    <div className=" flex lg:gap-3 ">
      <div className="relative bg-gray-900 rounded-lg w-full text-white">
        <div
          className="absolute lg:right-5 lg:top-3  "
          onClick={() => setShowTaskDetails(false)}
        >
          <CgCloseO className="lg:h-7 lg:w-7" />
        </div>
        <div className="lg:p-2 rounded-md">
          <div className="flex gap-24">
            <h2 className="lg:text-xl">{currentTask.title}</h2>
          </div>

          <div className="flex gap-2 lg:border-[0.01vw] lg:p-2 lg:rounded-xl lg:mt-4">
            <div className=" lg:h-44 lg:w-3/5 lg:p-2 lg:text-xs rounded-xl">
              <p>{currentTask.description}</p>
            </div>
            <div className="bg-white lg:w-[0.2vw] "></div>
            <div className="flex flex-col gap-2 lg:text-sm lg:ml-3">
              <p>Due: {formatDate(currentTask.dueDate)}</p>
              <p>
                Priority :{" "}
                <span
                  className={`${
                    currentTask.priority == "Low" && "text-green-500"
                  } ${currentTask.priority == "Medium" && "text-yellow-500"}
                ${currentTask.priority == "High" && "text-red-500"}`}
                >
                  {currentTask.priority}
                </span>
              </p>
              <p>
                Current Status :{" "}
                <span
                  className={`${
                    currentTask.status == "Completed" && "text-green-500"
                  } ${currentTask.status == "Pending" && "text-yellow-500"}
                ${currentTask.status == "Expired" && "text-red-500"}`}
                >
                  {currentTask.status}
                </span>
              </p>
              <p>
                Last Updated : <span>{formatDate(currentTask.updatedAt)}</span>
              </p>
              <p>
                Created : <span>{formatDate(currentTask.createdAt)}</span>
              </p>
              {currentTask.status == "Pending" && (
                <button
                  className="bg-green-500 text-gray-800 rounded-md lg:h-7 lg:w-40"
                  onClick={() => handleMarkAsCompleted(currentTask._id)}
                >
                  Mark as Completed
                </button>
              )}
            </div>
          </div>
        </div>
        {currentTask.status == "Pending" && (
          <div className="absolute lg:bottom-2 lg:left-2">
            <button
              onClick={() => {
                setShowCreateTask(true);
                setSelectedTask(currentTask);
              }}
              className="bg-blue-500 text-white px-5 lg:w-24 lg:h-8 rounded mr-4"
            >
              Edit
            </button>
            <button
              onClick={() => handleDelete(currentTask._id)}
              className="bg-red-500 text-white px-5 lg:w-24 lg:h-8 rounded"
            >
              Delete
            </button>
          </div>
        )}
        {showConfirmationBox && (
          <ConfirmationBox
            confirmationText="Do you want to mark this task as completed ?"
            setConfirmationStatus={confirmationStatus}
          />
        )}
      </div>
      <ChatComponent />
    </div>
  );
};

export default TaskDetails;
