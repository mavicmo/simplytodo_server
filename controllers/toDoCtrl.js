import ToDo from "../models/ToDo.js";
import User from "../models/Users.js";
/* Start of ToDo Controller Work */

// create a todo
const createTodo = async (req, res) => {
  try {
    // input for todo

    const { userId, name } = req.body;

    const newToDo = new ToDo({
      name: name.name,
      completed: false,
      userId,
    });

    await newToDo.save();

    await User.updateOne({ _id: userId }, { $push: { toDo: newToDo } });
    const toDoUser = await User.findOne({ _id: userId });

    const toDoList = await ToDo.find();
    res.status(201).json({
      status: 201,
      toDoList,
      toDoUser,
      message: "ToDo was successfully added.",
      requestAt: new Date().toLocaleString(),
    });
  } catch (error) {
    return res.status(500).json({
      status: 500,
      message: `${error}`,
      requestAt: new Date().toLocaleString(),
    });
  }
};

// read all todo
const getAllToDos = async (req, res) => {
  try {
    const userId = req.params.id;

    const toDoList = await ToDo.find({ userId: userId });

    res.status(201).json({
      status: 201,
      toDoList,
      message: "Successful reading all toDos",
      requestAt: new Date().toLocaleString(),
    });
  } catch (error) {
    return res.status(500).json({
      status: 500,
      message: `${error}`,
      requestAt: new Date().toLocaleString(),
    });
  }
};
// read all todo not completed
const notCompleteListOfToDo = async (req, res) => {
  try {
    const userId = req.params.id;

    const toDoList = await ToDo.find({ userId: userId, completed: false });

    res.status(201).json({
      status: 201,
      toDoList,
      message: "Successful reading all toDos",
      requestAt: new Date().toLocaleString(),
    });
  } catch (error) {
    return res.status(500).json({
      status: 500,
      message: `${error}`,
      requestAt: new Date().toLocaleString(),
    });
  }
};

// read all todo completed
const getAllCompletedToDos = async (req, res) => {
  try {
    const userId = req.params.id;

    const toDoList = await ToDo.find({ userId: userId, completed: true });

    res.status(201).json({
      status: 201,
      toDoList,
      message: "Successful reading all completed toDos",
      requestAt: new Date().toLocaleString(),
    });
  } catch (error) {
    return res.status(500).json({
      status: 500,
      message: `${error}`,
      requestAt: new Date().toLocaleString(),
    });
  }
};
// update a todo by Id
const updateToDo = async (req, res) => {
  try {
    const toDoId = req.params.id;
    const { userId, name } = req.body;

    const toDo = await ToDo.findByIdAndUpdate(toDoId, {
      name: name.name,
    });
    const toDoList = await ToDo.find({ userId: userId });

    res.status(200).json({
      status: 200,
      message: "Success update toDo",
      toDoList,
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
// delete a todo
const deleteAToDo = async (req, res) => {
  try {
    await ToDo.findByIdAndDelete(req.params.id);
    const newToDoList = await ToDo.find({
      _id: { $ne: req.params.id },
    });

    return res.status(200).json({
      status: 200,
      newToDoList,
      message: "Success Todo has been deleted",
      requestAt: new Date().toLocaleString(),
    });
  } catch (error) {
    return res.status(500).json({
      status: 500,
      message: `${error}`,
      requestAt: new Date().toLocaleString(),
    });
  }
};
// delete all todo per user
const deleteAllTodos = async (req, res) => {
  try {
    await ToDo.deleteMany();
    return res.status(200).json({
      status: 200,
      message: "Success all ToDos have been deleted",
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
// completed a todo
const completeAToDo = async (req, res) => {
  try {
    const toDoId = req.params.id;
    const { completed } = req.body;
    console.log(completed);

    await ToDo.findByIdAndUpdate(toDoId, {
      completed: completed,
    });

    const toDo = await ToDo.findById(toDoId);

    const newToDoList = await ToDo.find();

    return res.status(200).json({
      status: 200,
      toDo,
      newToDoList,
      message: "Success complete",
      requestAt: new Date().toLocaleString(),
    });
  } catch (error) {
    return res.status(500).json({
      status: 500,
      message: `${error}`,
      requestAt: new Date().toLocaleString(),
    });
  }
};

/* End of ToDo Controller Work */

const toDoCtrl = {
  createTodo,
  getAllToDos,
  notCompleteListOfToDo,
  updateToDo,
  deleteAToDo,
  deleteAllTodos,
  completeAToDo,
  getAllCompletedToDos,
};

export default toDoCtrl;
