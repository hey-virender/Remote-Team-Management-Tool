import React from "react";
import {
  BrowserRouter as Router,
  Route,
  Routes,
  Navigate,
} from "react-router-dom";
import { useAuth, useTaskContext, useError } from "./context/ContextProviders";
import { AuthProvider } from "./context/AuthContext";
import { TaskProvider } from "./context/TaskContext";
import { ErrorProvider } from "./context/ErrorContext";

import Dashboard from "./components/Dashboard";
import AuthComponent from "./components/AuthComponent";
import { NotificationsProvider } from "./context/NotificationContext";

function App() {
  const { user, loading } = useAuth();

  if (loading) {
    return <div>Loading...</div>; // Display a loading indicator while authentication state is being determined
  }

  return (
    <Router>
      <Routes>
        <Route path="/" element={user ? <Dashboard /> : <AuthComponent />} />
      </Routes>
    </Router>
  );
}

const AppWrapper = () => (
  <ErrorProvider>
    <AuthProvider>
      <NotificationsProvider>
        <TaskProvider>
          <App />
        </TaskProvider>
      </NotificationsProvider>
    </AuthProvider>
  </ErrorProvider>
);

export default AppWrapper;
