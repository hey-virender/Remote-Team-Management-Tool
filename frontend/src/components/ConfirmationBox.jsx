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
      <div className="bg-slate-800 lg:w-96 lg:h-24 lg:p-2 lg:rounded-lg">
        <div>{confirmationText}</div>
        <div className="mt-4 flex lg:justify-end lg:gap-16">
          <button
            className="bg-green-500 lg:w-16 lg:rounded-md"
            onClick={() => setConfirmationStatus(true)} // Resolve as true when Yes is clicked
          >
            Yes
          </button>
          <button
            className="bg-red-500 lg:w-16 lg:rounded-md"
            onClick={() => {
              setTimer(0);
              setConfirmationStatus(false);
            }} // Resolve as false when No is clicked
          >
            No {timer}
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
