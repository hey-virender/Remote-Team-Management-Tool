import React, { useEffect } from "react";
import PropTypes from "prop-types";

const ConfirmationBox = ({ confirmationText, setConfirmationStatus }) => {
  const [timer, setTimer] = React.useState(5);

  useEffect(() => {
    if (timer > 0) {
      setTimeout(() => setTimer(timer - 1), 1000);
    } else {
      setConfirmationStatus(false); // Auto-resolve as false when the timer runs out
    }
  }, [timer, setTimer, setConfirmationStatus]);

  return (
    <div className="absolute top-0 left-0 flex justify-center items-center w-full h-full bg-black bg-opacity-85 text-white">
      <div className="bg-slate-800 w-96 h-32 p-5 rounded-lg">
        <div>{confirmationText}</div>
        <div className="mt-4 flex justify-end gap-16">
          <button
            className="bg-green-500 w-16 rounded-md"
            onClick={() => setConfirmationStatus(true)} // Resolve as true when Yes is clicked
          >
            Yes
          </button>
          <button
            className="bg-red-500 w-16 rounded-md"
            onClick={() => {
              setTimer(0);
              setConfirmationStatus(false);
            }} // Resolve as false when No is clicked
          >
            No
            <span className="text-sm pl-3">
              
            {timer}
              </span> 
          </button>
        </div>
      </div>
    </div>
  );
};

ConfirmationBox.propTypes = {
  confirmationText: PropTypes.string.isRequired,
  setConfirmationStatus: PropTypes.func.isRequired,
};

export default ConfirmationBox;
