import File from "../models/File.js";

// Upload a new file
export const uploadFile = async (req, res) => {
  try {
    const file = new File({
      fileName: req.file.originalname,
      filePath: req.file.path,
      uploadedBy: req.user._id,
      task: req.body.taskId,
      project: req.body.projectId,
    });
    await file.save();
    res.status(201).json(file);
  } catch (error) {
    res.status(500).json({ message: "Error uploading file", error });
  }
};

// Get all files for a task or project
export const getFiles = async (req, res) => {
  try {
    const { taskId, projectId } = req.query;
    const filter = taskId
      ? { task: taskId }
      : projectId
      ? { project: projectId }
      : {};
    const files = await File.find(filter).populate("uploadedBy");
    res.status(200).json(files);
  } catch (error) {
    res.status(500).json({ message: "Error fetching files", error });
  }
};

// Get a file by ID
export const getFileById = async (req, res) => {
  try {
    const file = await File.findById(req.params.id).populate("uploadedBy");
    if (!file) {
      return res.status(404).json({ message: "File not found" });
    }
    res.status(200).json(file);
  } catch (error) {
    res.status(500).json({ message: "Error fetching file", error });
  }
};

// Delete a file
export const deleteFile = async (req, res) => {
  try {
    const file = await File.findByIdAndDelete(req.params.id);
    if (!file) {
      return res.status(404).json({ message: "File not found" });
    }
    res.status(200).json({ message: "File deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: "Error deleting file", error });
  }
};
