import TimeLog from "../models/TimeLog.js";

// Create a new time log
export const createTimeLog = async (req, res) => {
  try {
    const { startTime, endTime, duration, taskId } = req.body;
    const timeLog = new TimeLog({
      user: req.user._id,
      task: taskId,
      startTime,
      endTime,
      duration,
    });
    await timeLog.save();
    res.status(201).json(timeLog);
  } catch (error) {
    res.status(500).json({ message: "Error creating time log", error });
  }
};

// Get all time logs for a task
export const getTimeLogs = async (req, res) => {
  try {
    const timeLogs = await TimeLog.find({ task: req.query.taskId }).populate(
      "user"
    );
    res.status(200).json(timeLogs);
  } catch (error) {
    res.status(500).json({ message: "Error fetching time logs", error });
  }
};

// Get a time log by ID
export const getTimeLogById = async (req, res) => {
  try {
    const timeLog = await TimeLog.findById(req.params.id).populate("user");
    if (!timeLog) {
      return res.status(404).json({ message: "Time log not found" });
    }
    res.status(200).json(timeLog);
  } catch (error) {
    res.status(500).json({ message: "Error fetching time log", error });
  }
};

// Update a time log
export const updateTimeLog = async (req, res) => {
  try {
    const timeLog = await TimeLog.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
    });
    if (!timeLog) {
      return res.status(404).json({ message: "Time log not found" });
    }
    res.status(200).json(timeLog);
  } catch (error) {
    res.status(500).json({ message: "Error updating time log", error });
  }
};

// Delete a time log
export const deleteTimeLog = async (req, res) => {
  try {
    const timeLog = await TimeLog.findByIdAndDelete(req.params.id);
    if (!timeLog) {
      return res.status(404).json({ message: "Time log not found" });
    }
    res.status(200).json({ message: "Time log deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: "Error deleting time log", error });
  }
};
