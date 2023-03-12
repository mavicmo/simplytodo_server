import express from "express";
import { verifyToken } from "../middleware/auth.js";

const router = express.Router();

/* controller */
import controllers from "../controllers/index.js";

/* Routes */

// create todo
router.post("/createToDo", verifyToken, controllers.toDoCtrl.createTodo);

// update complete
router.put("/completeAToDo/:id", controllers.toDoCtrl.completeAToDo);

// read todo
router.get(
  "/notCompleteListOfToDo/:id",
  controllers.toDoCtrl.notCompleteListOfToDo
);
router.get(
  "/getAllCompletedToDos/:id",
  controllers.toDoCtrl.getAllCompletedToDos
);
router.get("/:id", controllers.toDoCtrl.getAllToDos);

// complete a todo

// update todo
router.put("/:id", verifyToken, controllers.toDoCtrl.updateToDo);

// delete a todo
router.delete("/:id", verifyToken, controllers.toDoCtrl.deleteAToDo);

// delete all todos
router.delete("/", verifyToken, controllers.toDoCtrl.deleteAllTodos);

/*  */

export { router as toDoRoutes };
