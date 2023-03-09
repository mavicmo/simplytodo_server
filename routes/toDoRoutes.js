import express from "express";
import { verifyToken } from "../middleware/auth.js";

const router = express.Router();

/* controller */
import controllers from "../controllers/index.js";

/* Routes */

// create todo
router.post("/createToDo", verifyToken, controllers.toDoCtrl.createTodo);

// read todo
router.get("/:id", controllers.toDoCtrl.getAllToDos);

// update todo
router.put("/:id", verifyToken, controllers.toDoCtrl.updateToDo);

// delete a todo
router.delete("/:id", verifyToken, controllers.toDoCtrl.deleteAToDo);

// delete all todos
router.delete("/", verifyToken, controllers.toDoCtrl.deleteAllTodos);
// complete a todo
router.patch("/:id", verifyToken, controllers.toDoCtrl.completeAToDo);
/*  */

export { router as toDoRoutes };
