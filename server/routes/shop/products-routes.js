const express = require("express");
const multer = require("multer"); // Import multer

// Set up multer storage
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "uploads/"); // Directory where the uploaded files will be stored
  },
  filename: function (req, file, cb) {
    cb(null, Date.now() + "-" + file.originalname); // Append timestamp to the filename
  }
});

const upload = multer({ storage: storage }); // Initialize multer with the defined storage

const { getFilterProducts , getProductDetails} = require("../../controllers/shop/products-controller");

const router = express.Router();

// Image upload route
router.post("/upload-images", upload.single("my_file"), (req, res) => {
  // Handle the uploaded file and send a response
  res.status(200).send({ message: "File uploaded successfully", file: req.file });
});

// Route to get filtered products
router.get("/get", getFilterProducts);
router.get("/get/:id", getProductDetails);

module.exports = router;
