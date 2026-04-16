import express from "express";
import { logins, logout, register } from "../controller/authcontroller.js";
import { auth } from "../middleware/auth.js";

const router = express.Router();

router.route("/register").post(register);
router.route("/login").post(logins);
router.route("/logout").get(auth, logout);

export default router;
