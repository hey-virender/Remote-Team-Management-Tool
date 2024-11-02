import React, { useEffect } from "react";
import { getTasks } from "../api/taskService";
import TaskForm from "./TaskForm";
import TaskComponent from "./TaskComponent";
import { useTaskContext } from "../context/ContextProviders";

function TaskList() {
  const { tasks, setTasks, showCreateTask, setShowCreateTask } =
    useTaskContext();

  useEffect(() => {
    // Fetch tasks
    getTasks()
      .then((response) => setTasks(response.data))
      .catch((error) => console.error("Error fetching tasks:", error));
  }, [showCreateTask, setTasks]);

  return (
    <div className="p-4  rounded shadow h-96">
      {!showCreateTask && (
        <div className="flex justify-between">
          <h2 className="text-lg font-bold mb-2">Task List</h2>
          <button
            className="bg-blue-500 rounded-sm lg:px-3 lg:py-1 "
            onClick={() => setShowCreateTask(true)}
          >
            New Task
          </button>
        </div>
      )}

      {showCreateTask ? (
        <TaskForm />
      ) : (
        <div className="scrollbar-hidden overflow-y-scroll max-h-[80vh] pb-10">
          <div
            className={` ${
              tasks.length > 0
                ? " xs:flex xs:flex-col xs:gap-4 sm:grid sm:grid-cols-2 md:grid-cols-3 lg:gap-y-5 lg:gap-x-4 lg:mt-4 "
                : "flex justify-center items-center lg:pt-24"
            }`}
          >
            {tasks.length > 0
              ? tasks?.map((task, index) => (
                  <TaskComponent key={index} task={task} />
                ))
              : "No tasks yet available"}
          </div>
        </div>
      )}
    </div>
  );
}

export default TaskList;
