import { useContext } from "react";
import { ErrorContext } from "./ErrorContext";
import { TaskContext } from "./TaskContext";
import { AuthContext } from "./AuthContext";
import { NotificationsContext } from "./NotificationContext";

export const useError = () => useContext(ErrorContext);
export const useTaskContext = () => {
  return useContext(TaskContext);
};
export const useNotifications = () => useContext(NotificationsContext);
export const useAuth = () => useContext(AuthContext);
