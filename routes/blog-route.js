import express from "express";
import multer from "multer";
import { CreateBlog } from "../controller/blog-controller.js";
const upload = multer();
const router = express.Router();

router.post("/blog", upload.single("image"), CreateBlog);

export default router;
