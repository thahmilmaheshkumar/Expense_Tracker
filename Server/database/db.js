import mongoose from "mongoose";

export const connectDB = async () => {
  mongoose
    .connect(process.env.MONGODB_URI)
    .then(() => {
      console.log("database connected with host ", mongoose.connection.host);
    })
    .catch((error) => {
      console.log(error);
    });
};
