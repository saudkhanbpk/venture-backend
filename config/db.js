import mongoose from "mongoose";

export const connectDB = async () => {
  await mongoose
    .connect(process.env.MONOGO_URL)
    .then(() => {
      console.log("MongoDB connected");
    })
    .catch(() => {
      console.log("MongoDB not connected");
    });
};
