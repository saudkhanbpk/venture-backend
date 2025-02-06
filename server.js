import express from "express";
import dotenv from "dotenv";
dotenv.config();
import cors from "cors";
import { connectDB } from "./config/db.js";
import blogRoute from './routes/blog-route.js';

const app = express();
const port = process.env.PORT;
app.use(express.json());
app.use(cors());

connectDB();
app.use('/api', blogRoute);
app.get("/dashboard", (req, res) => {
  res.send("hello");
});

app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
