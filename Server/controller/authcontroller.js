import login from "../model/login.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import { connectDB } from "../database/db.js";

await connectDB();

export const register = async (req, res) => {
  try {
    const { name, password, email } = req.body;
    if (!name || !email || !password) {
      return res
        .status(400)
        .json({ success: false, message: "Invalid user deatils" });
    }
    const user = await login.find({ name });

    if (user.length > 0) {
      return res
        .status(400)
        .json({ success: false, message: `${name} already exist` });
    }

    req.body.password = await bcrypt.hash(password, 10);

    const newUser = await login.create(req.body);

    res
      .status(201)
      .json({ success: true, message: "User created successfully", newUser });
  } catch (error) {
    console.log(error);
    res.status(400).json({ success: false, message: "Server error" });
  }
};

export const logins = async (req, res) => {
  try {
    const { name, password } = req.body;
    const user = await login.findOne({ name });

    if (!user) {
      return res.status(400).json({ success: false, message: "Invalid user" });
    }

    const ismatch = await bcrypt.compare(password, user.password);
    if (!ismatch) {
      return res
        .status(400)
        .json({ success: false, message: "Incorrect password" });
    }

    // console.log(user);

    const token = await jwt.sign({ id: user._id }, process.env.JET_SECRETE, {
      expiresIn: process.env.JWT_EXPIRES,
    });

    res.cookie("token", token, {
      maxAge: process.env.COOKIE_EXPIRES * 24 * 60 * 60 * 1000,
      httpOnly: true,
      secure: true,
      sameSite: "None",
    });

    res.status(200).json({ success: false, message: "Login success" });
  } catch (error) {
    console.log(error);
    res.status(400).json({ success: false, message: "Server error" });
  }
};

export const logout = async (req, res) => {
  try {
    res.clearCookie("token");
    res.status(200).json({ success: true, message: "Logout success" });
  } catch (error) {
    console.log(error);
    res.status(400).json({ success: false, message: "Server error" });
  }
};
