import express from "express";
import multer from "multer";
import { CreateBlog, getBlogs } from "../controller/blog-controller.js";
const upload = multer();
const router = express.Router();

router.post("/blog", upload.single("file"), CreateBlog);
router.get('/blogs', getBlogs);

export default router;
