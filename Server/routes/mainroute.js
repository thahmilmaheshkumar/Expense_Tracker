import express from "express";
import {
  addEvent,
  category,
  checkBalance,
  monthlyExp,
  monthlyInc,
  viewEvent,
  yearGraph,
} from "../controller/tracjercontroller.js";
import { auth } from "../middleware/auth.js";

const mainRouter = express.Router();

mainRouter.route("/tracker").post(auth, addEvent).get(auth, viewEvent);
mainRouter.route("/balance").get(auth, checkBalance);
mainRouter.route("/moninc").get(auth, monthlyInc);
mainRouter.route("/monexp").get(auth, monthlyExp);
mainRouter.route("/yeargraph").get(auth, yearGraph);
mainRouter.route("/category").get(auth, category);

export default mainRouter;
