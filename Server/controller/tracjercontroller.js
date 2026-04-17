import { connectDB } from "../database/db.js";
import tracker from "../model/tracker.js";
await connectDB();

export const addEvent = async (req, res) => {
  try {
    req.body.user_id = req.user._id;
    const record = await tracker.create(req.body);
    res.status(200).json({ success: true, message: "Event created", record });
  } catch (error) {
    console.log(error);
    res.status(400).json({ success: false, message: "Server error" });
  }
};

export const viewEvent = async (req, res) => {
  try {
    const id = req.user._id;
    const record = await tracker.find({ user_id: id });

    res.status(200).json({ success: true, record });
  } catch (error) {
    console.log(error);
    res.status(400).json({ success: false, message: "Server error" });
  }
};

export const checkBalance = async (req, res) => {
  try {
    const id = req.user._id;
    const record = await tracker.find({ user_id: id });
    let totalInc = 0;
    let totalExe = 0;
    record.map((rec) => {
      //   console.log(rec);
      if (rec.role == "income") {
        // console.log(totalInc);
        totalInc += rec.amount;
        // console.log(totalInc);
      } else {
        totalExe += rec.amount;
      }
    });

    const balance = totalInc - totalExe;

    res.status(200).json({ success: true, balance });
  } catch (error) {
    console.log(error);
    res.status(400).json({ success: false, message: "Server error" });
  }
};

export const monthlyInc = async (req, res) => {
  try {
    // console.log(rec.date.toLocaleDateString().split("/")[1]);
    // console.log(new Date().getMonth() + 1);
    // console.log(record[0].date.toLocaleDateString());

    const id = req.user._id;
    const record = await tracker.find({ user_id: id });
    let monthIncome = 0;
    record.map((rec) => {
      if (
        Number(rec.date.toLocaleDateString().split("/")[1]) ==
        new Date().getMonth() + 1
      ) {
        if (rec.role == "income") {
          monthIncome += rec.amount;
        }
      }
    });

    res.status(200).json({ success: true, monthIncome });
  } catch (error) {
    console.log(error);
    res.status(400).json({ success: false, message: "Server error" });
  }
};

export const monthlyExp = async (req, res) => {
  try {
    const id = req.user._id;
    const record = await tracker.find({ user_id: id });
    let monthExp = 0;
    record.map((rec) => {
      if (
        rec.date.toLocaleDateString().split("/")[1] ==
        new Date().getMonth() + 1
      ) {
        if (rec.role == "expense") {
          monthExp += rec.amount;
        }
      }
    });

    res.status(200).json({ success: true, monthExp });
  } catch (error) {
    console.log(error);
    res.status(400).json({ success: false, message: "Server error" });
  }
};

export const yearGraph = async (req, res) => {
  try {
    const id = req.user._id;
    const record = await tracker.find({ user_id: id });
    const currentYear = new Date().getFullYear();

    const yearlyRecord = [];

    record.map((rec) => {
      if (Number(rec.date.toLocaleDateString().split("/")[2]) == currentYear) {
        yearlyRecord.push(rec);
      }
    });

    res.status(200).json({ success: true, yearlyRecord });
  } catch (error) {
    console.log(error);
    res.status(400).json({ success: false, message: "Server error" });
  }
};

export const category = async (req, res) => {
  try {
    const id = req.user._id;
    const record = await tracker.find({ user_id: id }).sort({ date: -1 });
    res.status(200).json({ success: true, record });
  } catch (error) {
    console.log(error);
    res.status(400).json({ success: false, message: "Server error" });
  }
};
