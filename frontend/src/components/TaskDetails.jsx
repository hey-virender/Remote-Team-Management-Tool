import React, { useState } from "react";
import { deleteTask, markTaskCompleted } from "../api/taskService";
import ChatComponent from "./ChatComponent";
import { useTaskContext } from "../context/ContextProviders";
import TaskForm from "./TaskForm";
import { CgCloseO } from "react-icons/cg";
import ConfirmationBox from "./ConfirmationBox";
import { MdChat } from "react-icons/md";
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
  const [confirmationMessage, setConfirmationMessage] = useState(null);
  const [showChat, setShowChat] = useState(false);

  
const handleDeleteTask = async (id) => {
  setShowConfirmationBox(true);
  setConfirmationMessage("Are you sure you want to delete this task?");

  // Wait for the user's decision (Yes or No)
  const confirmed = await new Promise((resolve) => {
    const handleConfirmationStatus = (status) => {
      resolve(status); // Resolve with the user's choice (true or false)
      setConfirmationStatus(null); // Reset the confirmation status
      setShowConfirmationBox(false); // Hide the confirmation box
      setConfirmationMessage(null); // Reset the confirmation message
    };

    // Temporary function to pass to the confirmation box
    setConfirmationStatus(() => handleConfirmationStatus);
  });

  // If the user confirmed (clicked Yes), delete the task
  if (confirmed) {
    try {
      await deleteTask(id);
      setConfirmationMessage(null);
      setShowTaskDetails(false)
      // Handle any additional logic after deleting the task
    } catch (error) {
      console.error("Error deleting task:", error);
    }
  }
};
  const handleMarkAsCompleted = async (id) => {
    setShowConfirmationBox(true);
    setConfirmationMessage(
      "Are you sure you want to mark this task as completed?"
    );

    // Wait for the user's decision (Yes or No)
    const confirmed = await new Promise((resolve) => {
      const handleConfirmationStatus = (status) => {
        resolve(status); // Resolve with the user's choice (true or false)
        setConfirmationStatus(null); // Reset the confirmation status
        setShowConfirmationBox(false); // Hide the confirmation box
        setConfirmationMessage(null); // Reset the confirmation message
      };

      // Temporary function to pass to the confirmation box
      setConfirmationStatus(() => handleConfirmationStatus);
    });

    // If the user confirmed (clicked Yes), mark the task as completed
    if (confirmed) {
      try {
        await markTaskCompleted(id);
        setConfirmationMessage(null);
        setShowTaskDetails(false)
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
    <div className=" flex xs:flex-col sm:flex-row lg:gap-3 overflow-x-hidden">
      <div className="relative bg-gray-900 rounded-lg w-full text-white xs:pb-5">
        <div className="absolute right-5 top-3 xs:right-2 xs:flex xs:flex-col xs:gap-4">
          <CgCloseO
            className="h-7 w-7"
            onClick={() => setShowTaskDetails(false)}
          />
          <MdChat
            className="h-7 w-7 xs:block xs:z-50 sm:hidden "
            onClick={() => setShowChat(!showChat)}
          />
        </div>
        <div className="p-2 xs:pr-10 rounded-md">
          <div>
            <h2 className="xs:text-sm ">{currentTask.title}</h2>
          </div>

          <div className="flex gap-2  xs:flex-col lg:border-[0.01vw] lg:p-2 lg:rounded-xl mt-4">
            <div className=" border-[1px] h-44 md:w-3/5 xs:h-28 p-2 text-sm rounded-xl">
              <p>{currentTask.description}</p>
            </div>
            <div className="bg-white lg:w-[0.2vw] "></div>
            <div className="flex flex-col  gap-2 text-sm ml-3 xs:grid xs:grid-cols-2">
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
          <div className="xs:flex xs:justify-around xs:mt-4 lg:absolute lg:bottom-2 lg:left-2">
            <button
              onClick={() => {
                setShowCreateTask(true);
                setSelectedTask(currentTask);
              }}
              className="bg-blue-500 text-white px-5 w-24 h-8 rounded mr-4"
            >
              Edit
            </button>
            <button
              onClick={() => handleDeleteTask(currentTask._id)}
              className="bg-red-500 text-white px-5 w-24 h-8 rounded"
            >
              Delete
            </button>
          </div>
        )}
        {showConfirmationBox && (
          <ConfirmationBox
            confirmationText={confirmationMessage}
            setConfirmationStatus={confirmationStatus}
          />
        )}
      </div>
      <div
        className={`xs:absolute xs:w-full xs:h-full xs:bg-black xs:bg-opacity-90 xs:transition-all xs:ease-linear xs:duration-300 sm:static sm:bg-transparent sm:translate-x-1/4 ${
          !showChat ? "xs:-translate-x-full" : "xs:translate-x-0"
        } `}
      >
        <ChatComponent />
      </div>
    </div>
  );
};

export default TaskDetails;
