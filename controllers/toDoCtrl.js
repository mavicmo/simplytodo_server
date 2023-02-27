import ToDo from "../models/ToDo.js";
import User from "../models/Users.js";
/* Start of ToDo Controller Work */

// create a todo
const createTodo = async (req, res) => {
  try {
    // input for todo
    const { userId, name } = req.body;

    const newToDo = new ToDo({
      name,
      completed: false,
      userId,
    });

    await newToDo.save();
    const toDoList = await ToDo.find();
    res.status(201).json({
      status: 201,
      toDoList,
      message: "ToDo was successfully added.",
      requestAt: new Date().toLocaleString(),
    });
  } catch (error) {
    return res.status(500).json({
      status: 500,
      message: "Server error",
      requestAt: new Date().toLocaleString(),
    });
  }
};

// read all todo
const getAllToDos = async (req, res) => {
  try {
  } catch (error) {
    return res.status(500).json({
      status: 500,
      message: "Server error",
      requestAt: new Date().toLocaleString(),
    });
  }
};
// update a todo
const updateToDo = async (req, res) => {
  try {
  } catch (error) {
    return res.status(500).json({
      status: 500,
      message: "Server error",
      requestAt: new Date().toLocaleString(),
    });
  }
};
// delete a todo
const deleteAToDo = async (req, res) => {
  try {
  } catch (error) {
    return res.status(500).json({
      status: 500,
      message: "Server error",
      requestAt: new Date().toLocaleString(),
    });
  }
};
// delete all todo per user
const deleteAllTodos = async (req, res) => {
  try {
  } catch (error) {
    return res.status(500).json({
      status: 500,
      message: "Server error",
      requestAt: new Date().toLocaleString(),
    });
  }
};
// completed a todo
const completeAToDo = async (req, res) => {
  try {
  } catch (error) {
    return res.status(500).json({
      status: 500,
      message: "Server error",
      requestAt: new Date().toLocaleString(),
    });
  }
};

/* End of ToDo Controller Work */

const toDoCtrl = {};

export default toDoCtrl;
