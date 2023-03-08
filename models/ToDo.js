import mongoose from "mongoose";

const Schema = mongoose.Schema;

const ToDo = new Schema(
  {
    name: {
      type: String,
      required: [true, "Name is required"],
    },
    completed: {
      type: Boolean,
    },
    userId: {
      type: String,
      required: true,
    },
  },
  {
    timestamp: true,
  }
);

const ToDoModel = mongoose.model("ToDoModel", ToDo);

export default ToDoModel;
