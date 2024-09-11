// imageUploadController.js
import express from "express";
import cloudinary from "cloudinary";

const { v2: cloudinaryV2, uploader } = cloudinary;

// Configure Cloudinary
cloudinaryV2.config({
  cloud_name: "tesalab",
  api_key: "129872178934864",
  api_secret: "C8UsT4h4-uudmbIyoIaZW1MbNwg",
});

const configureCloudinaryRoutes = (app) => {
  const router = express.Router();

  router.post("/upload-image", async (req, res) => {
    try {
      if (!req.file) {
        return res.status(400).json({ message: "No image file provided" });
      }

      const result = await uploader.upload(req.file.path, {
        folder: "posts",
      });

      res.status(200).json({ secure_url: result.secure_url });
    } catch (error) {
      console.error("Error uploading image to Cloudinary:", error);
      res.status(500).json({ message: "Image upload failed" });
    }
  });

  app.use("/cloudinary", router);
};

export { configureCloudinaryRoutes };
