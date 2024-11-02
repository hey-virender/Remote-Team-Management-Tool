import React, { useEffect, useState } from "react";
import { createTask, updateTask } from "../api/taskService";
import { useTaskContext } from "../context/ContextProviders";
import PropTypes from "prop-types";

function TaskForm() {
  const { tasks, setTasks, setShowCreateTask, selectedTask, setSelectedTask } =
    useTaskContext();
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [dueDate, setDueDate] = useState(formatDate(Date.now()));
  const [priority, setPriority] = useState("Medium");
  const task = selectedTask;

  function formatDate(dateString) {
    const date = new Date(dateString);
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, "0");
    const day = String(date.getDate()).padStart(2, "0");
    return `${year}-${month}-${day}`;
  }

  useEffect(() => {
    if (task) {
      setTitle(task.title);
      setDescription(task.description);
      setDueDate(formatDate(task.dueDate));
      setPriority(task.priority);
    }
  }, [task]);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (title === "" || dueDate === null) {
      return alert("Please enter a title and date");
    }
    if (new Date(dueDate) < Date.now()) {
      alert("Due date cannot be in the past");
      return;
    }

    const maxDueDate = new Date(Date.now());
    maxDueDate.setMonth(maxDueDate.getMonth() + 3);
    if (new Date(dueDate) > maxDueDate) {
      alert("Due date cannot be more than 3 months from now");
      return;
    }

    if (task) {
      updateTask(task._id, {
        title,
        description,
        dueDate,
        priority,
        updatedAt: Date.now(),
      })
        .then((updatedTask) => {
          setTasks((prevTasks) =>
            prevTasks.map((t) => (t._id === updatedTask._id ? updatedTask : t))
          );
          setShowCreateTask(false);
          setSelectedTask(null);
        })
        .catch((error) => console.error("Error updating task:", error));
    } else {
      createTask({ title, description, dueDate, priority })
        .then((newTask) => {
          setTasks((prevTasks) => [...prevTasks, newTask]);
          setShowCreateTask(false);
          setSelectedTask(null);
        })
        .catch((error) => console.error("Error creating task:", error));
    }
  };

  return (
    <div className="bg-gray-900 p-4 rounded-sm max-h-full">
      <h2 className="text-lg font-bold mb-2">
        {task ? "Edit Task" : "New Task"}
      </h2>
      <form
        onSubmit={handleSubmit}
        className="grid gap-x-3 gap-y-0 xs:grid-cols-2  md:grid-rows-4 md:grid-cols-3 "
      >
        <label className="lg:row-span-1 lg:col-span-1 xs:col-span-3 xs:text-sm" htmlFor="title">
          Task Title
          <input
            id="title"
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            className="border p-2 w-full mb-2 bg-transparent rounded-md"
            placeholder="Task Title"
            required
          />
        </label>
        <label htmlFor="description" className="md:row-span-3 md:col-span-2 xs:row-span-1 xs:col-span-3 xs:text-sm">
          Task Description
          <textarea
            name="description"
            id="description"
            value={description}
            className=" w-full xs:h-20 lg:h-48 resize-none bg-transparent border-2 outline-none rounded-md"
            onChange={(e) => setDescription(e.target.value)}
          ></textarea>
        </label>
        <label htmlFor="dueDate" className="col-span-1 row-span-1 xs:text-sm">
          <span>Due Date</span>
          <input
            id="dueDate"
            type="date"
            value={dueDate}
            placeholder="Select due date"
            onChange={(e) => setDueDate(e.target.value)}
            className="bg-transparent w-full uppercase"
          />
        </label>
        <label htmlFor="priority" className="col-span-1 row-span-1 xs:text-sm">
          Priority
          <select
            id="priority"
            value={priority}
            onChange={(e) => setPriority(e.target.value)}
            className={`border p-2 w-full rounded-md bg-transparent  ${
              priority === "Low" && "text-green-500 "
            } ${priority === "Medium" && "text-yellow-500"} ${
              priority === "High" && "text-red-500"
            }`}
          >
            {["Low", "Medium", "High"].map((priority) => (
              <option
                key={priority}
                value={priority}
                className={`focus:bg-transparent hover:bg-transparent ${
                  priority === "Low" && "text-green-500 focus:text-green-500"
                } ${
                  priority === "Medium" &&
                  "text-yellow-500 focus:text-yellow-500"
                } ${priority === "High" && "text-red-500 focus:text-red-500"}`}
              >
                {priority}
              </option>
            ))}
          </select>
        </label>
        <div className="flex lg:h-8 justify-around xs:col-span-2 xs:text-sm xs:mt-3 lg:col-span-1">
          <button type="submit" className="bg-blue-500 text-white p-2 rounded xs:p-1">
            {task ? "Update Task" : "Create Task"}
          </button>
          <button
            type="button"
            className="bg-gray-500 text-white p-2 rounded ml-2 xs:p-1"
            onClick={() => {
              setShowCreateTask(false);
            }}
          >
            Cancel
          </button>
        </div>
      </form>
    </div>
  );
}

TaskForm.propTypes = {
  task: PropTypes.object,
  onClose: PropTypes.func,
  setShowCreateTask: PropTypes.func,
};

export default TaskForm;
