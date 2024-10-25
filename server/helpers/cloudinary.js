const cloudinary = require("cloudinary").v2;
const multer = require("multer");

cloudinary.config({
  cloud_name: "domrnkhzc",
  api_key: "295534557936269",
  api_secret: "NEMGCOjmvZVtY5UyOYaj0m9RLYc",
});

const storage = new multer.memoryStorage();

async function imageUploadUtil(file) {
  const result = await cloudinary.uploader.upload(file, {
    resource_type: "auto",
  });

  return result;
}

const upload = multer({ storage });

module.exports = {
  upload,
  imageUploadUtil,
};