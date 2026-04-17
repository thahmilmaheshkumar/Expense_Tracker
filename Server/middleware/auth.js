import jwt from "jsonwebtoken";
import login from "../model/login.js";

export const auth = async (req, res, next) => {
  try {
    const { token } = req.cookies;
    if (!token) {
      return res
        .status(400)
        .json({ success: false, message: "Login to access" });
    }

    const decode = jwt.verify(token, process.env.JET_SECRETE);
    req.user = await login.findById(decode.id);
    next();
  } catch (error) {
    console.log(error);
    res.status(400).json({ success: false, message: "Login to access jsjs" });
  }
};
