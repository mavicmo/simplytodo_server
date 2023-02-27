import Users from "../models/Users.js";
import jwt from "jsonwebtoken";
import bcrypt from "bcryptjs";
import dotenv from "dotenv";
dotenv.config();

/* Start of Users Controller Work */

// register
const register = async (req, res) => {
  try {
    // get user data
    const { firstName, lastName, email, password } = req.body;

    // validate
    if (!(firstName && lastName && email && password)) {
      res.status(400).send("All inputs are required!");
    }

    // check if user already exist
    const oldUser = await Users.findOne({ email });
    if (oldUser) {
      return res
        .status(409)
        .send("Email account already exist. Try a new email account!");
    }

    // encrypt user password
    const encryptedPassword = await bcrypt.hash(password, 10);

    // create user in database
    const user = await Users.create({
      firstName,
      lastName,
      email: email.toLowerCase(),
      password: encryptedPassword,
    });

    res.status(201).json({
      status: 201,
      message: "User was created successfully",
      user,
    });
  } catch (err) {
    res.status(404).json({ message: err.message });
  }
};

// login
const login = async (req, res) => {
  try {
    // get user input
    const { email, password } = req.body;

    // validate user input
    if (!(email && password)) {
      res.status(400).send("No input was entered");
    }

    // validate if user exist in database
    const user = await Users.findOne({ email: email });
    if (!user) return res.status(400).json({ msg: "User does not exist." });

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) return res.status(400).json({ msg: "invalid password" });

    const payload = {
      email: user.email,
      id: user._id,
    };
    const token = jwt.sign(
      payload,
      process.env.TOKEN_KEY,

      {
        expiresIn: "24h",
      }
    );

    //save user token
    user.token = token;

    // user
    res.status(200).json(user);
  } catch (err) {
    res.status(404).json({ message: err.message });
  }
};

// Delete User

const deleteUser = async (req, res) => {
  try {
    await Users.findByIdAndDelete(req.params.id);
    return res.status(200).json({
      status: 200,
      message: "Success User has been deleted",
      requestAt: new Date().toLocaleString(),
    });
  } catch (err) {
    res.status(404).json({ message: err.message });
  }
};

/* End of Users Controller Work */

const usersCtrl = {
  register,
  login,
  deleteUser,
};

export default usersCtrl;
