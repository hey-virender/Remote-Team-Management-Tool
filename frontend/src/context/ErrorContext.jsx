import React, { createContext, useContext, useState, useEffect } from "react";
import PropTypes from "prop-types";
// Create the context
export const ErrorContext = createContext();

// Custom hook to use the ErrorContext

export const ErrorProvider = ({ children }) => {
  const [error, setError] = useState(null);

  // Clear the error after 3 seconds
  useEffect(() => {
    if (error) {
      const timer = setTimeout(() => {
        setError(null);
      }, 3000);

      // Cleanup the timer if the component unmounts or error changes
      return () => clearTimeout(timer);
    }
  }, [error]);

  return (
    <ErrorContext.Provider value={{ error, setError }}>
      {children}
    </ErrorContext.Provider>
  );
};

ErrorProvider.propTypes = {
  children: PropTypes.node.isRequired,
};
