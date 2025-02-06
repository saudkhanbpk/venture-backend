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
      const imageFileBuffer = req.file.buffer;

      try {
        const imageResult = await uploadImageToCloudinary(imageFileBuffer);
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
    res.status(500).json({ message: "Inernal Server Error", error });
    console.log("error", error);
  }
};

export const getBlogs = async (req, res) => {
  try {
    const blogs = await User.find().sort({ createdAt: -1 }); 
    res.status(200).json(blogs);
  } catch (error) {
    console.log("Error:", error);
    res.status(500).json({ message: "Internal Server Error", error });
  }
};
