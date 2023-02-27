import express from "express";
import { verifyToken } from "../middleware/auth.js";

const router = express.Router();

/* controller */
import controllers from "../controllers/index.js";

/* Routes */

// register route
router.post("/register", controllers.usersCtrl.register);
// login route
router.post("/login", controllers.usersCtrl.login);
// delete user by ID
router.delete("/:id", verifyToken, controllers.usersCtrl.deleteUser);

/*  */

export { router as usersRoutes };
