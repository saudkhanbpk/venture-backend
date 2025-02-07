import cloudinary from "../config/cloudinary.config.js";
import User from "../models/blog-model.js";

const uploadImageToCloudinary = (fileBuffer, folder) => {
  return new Promise((resolve, reject) => {
    const stream = cloudinary.uploader.upload_stream(
      { folder },
      (error, result) => {
        if (error) {
          reject(error);
        } else {
          resolve(result);
        }
      }
    );
    stream.end(fileBuffer);
  });
};

export const CreateBlog = async (req, res) => {
  const { title, description } = req.body;

  try {
    let imageUrl = "";

    if (req.file) {
      try {
        const imageResult = await uploadImageToCloudinary(req.file.buffer);
        imageUrl = imageResult.secure_url;
      } catch (error) {
        console.error("Error uploading to Cloudinary:", error);
        return res.status(500).json({ msg: "Image upload failed" });
      }
    }

    const user = new User({ title, description, image: imageUrl });
    await user.save();
    res.status(201).json({ message: "Blog Created..", user });
  } catch (error) {
    res.status(500).json({ message: "Internal Server Error", error });
  }
};

export const getBlogs = async (req, res) => {
  try {
    const blogs = await User.find().sort({ createdAt: -1 }); 
    res.status(200).json(blogs);
  } catch (error) {
    res.status(500).json({ message: "Internal Server Error", error });
  }
};

export const deleteBlog = async (req, res) => {
  const { id } = req.params;

  try {
    const blog = await User.findById(id);
    if (!blog) return res.status(404).json({ message: "Blog not found" });

    await User.findByIdAndDelete(id);
    res.status(200).json({ message: "Blog deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: "Internal Server Error", error });
  }
};

export const updateBlog = async (req, res) => {
  const { id } = req.params;
  const { title, description } = req.body;

  try {
    const blog = await User.findById(id);
    if (!blog) return res.status(404).json({ message: "Blog not found" });

    let imageUrl = blog.image;

    if (req.file) {
      try {
        const imageResult = await uploadImageToCloudinary(req.file.buffer);
        imageUrl = imageResult.secure_url;
      } catch (error) {
        console.error("Error uploading to Cloudinary:", error);
        return res.status(500).json({ msg: "Image upload failed" });
      }
    }

    blog.title = title;
    blog.description = description;
    blog.image = imageUrl;

    await blog.save();
    res.status(200).json({ message: "Blog updated successfully", blog });
  } catch (error) {
    res.status(500).json({ message: "Internal Server Error", error });
  }
};
