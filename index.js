/* Backend Hosting - FireBase */
import { initializeApp } from "firebase/app";
// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyASsgeUm0bHW_d_dfZY8MAlZO8EcMscqf8",
  authDomain: "simplytodo-d4508.firebaseapp.com",
  projectId: "simplytodo-d4508",
  storageBucket: "simplytodo-d4508.appspot.com",
  messagingSenderId: "183622810553",
  appId: "1:183622810553:web:4e86d96e5f7c66e7efd468",
};
/* Import dependencies */
import express from "express";
import cors from "cors";

/* load env vars */
import dotenv from "dotenv";
dotenv.config();

/* PORT */
const PORT = process.env.PORT;

/* Internal Modules */
import routes from "./routes/index.js";

/* Connect to Mongo DB */
import "./config/db.connection.js";

/* Setup Express */
const app = express();
app.use(express.static("public"));
app.use(express.json());
app.use(express.urlencoded({ extend: true }));

/* Configure App */

/* Mount Middleware */

/* CORS */
app.use(cors());

/* Test Route */
app.get("/", (req, res) => {
  const template = `
        <div style="height: 100vh; display: flex; justify-content: center; align-items: center;">
          <h1> HELLO WORLD</h1>
        </div>
      `;
  res.send(template);
});

/* Routes */
// app.use("/example", routes.exampleRoutes);
app.use("/users", routes.usersRoutes);
app.use("/todo", routes.toDoRoutes);

// Initialize Firebase
const firebase = initializeApp(firebaseConfig);

/* App Listener */
app.listen(PORT, () => console.log(`Listening on PORT:${PORT}`));
