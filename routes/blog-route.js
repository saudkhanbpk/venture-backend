import express from "express";
import multer from "multer";
import {
  CreateBlog,
  deleteBlog,
  getBlogs,
  updateBlog,
} from "../controller/blog-controller.js";
const upload = multer();
const router = express.Router();

router.post("/blog", upload.single("file"), CreateBlog);
router.get("/blogs", getBlogs);
router.put("/blog/:id", upload.single("file"), updateBlog);
router.delete("/blog/:id", deleteBlog);

export default router;
