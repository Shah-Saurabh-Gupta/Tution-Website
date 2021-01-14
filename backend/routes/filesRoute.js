const router = require("express").Router();
const cloudinary = require("../utils/cloudinary");
const upload = require("../utils/multer");
const File = require("../models/fileModel");

router.post("/", upload.single("file"), async (req, res) => {
  try {
    // Upload image to cloudinary
    const result = await cloudinary.uploader.upload(req.file.path);

    // Create new user
    let user = new File({
      filename: req.body.filename,
      batch: req.body.batch,
      avatar: result.secure_url,
      cloudinary_id: result.public_id,
    });
    // Save user
    await user.save();
    res.json(user);
  } catch (err) {
    console.log(err);
  }
});

router.get("/", async (req, res) => {
  try {
    let user = await File.find();
    res.json(user);
  } catch (err) {
    console.log(err);
  }
});
router.get("/:batch", async (req, res) => {
  try {
    let user = await File.find({ batch: req.params.batch });
    res.json(user);
  } catch (err) {
    console.log(err);
  }
});
router.delete("/:id", async (req, res) => {
  try {
    // Find user by id
    let user = await File.findById(req.params.id);
    // Delete image from cloudinary
    await cloudinary.uploader.destroy(user.cloudinary_id);
    // Delete user from db
    await user.remove();
    res.json(user);
  } catch (err) {
    console.log(err);
  }
});

router.put("/:id", upload.single("file"), async (req, res) => {
  try {
    let user = await File.findById(req.params.id);
    // Delete image from cloudinary
    await cloudinary.uploader.destroy(user.cloudinary_id);
    // Upload image to cloudinary
    const result = await cloudinary.uploader.upload(req.file.path);
    const data = {
      name: req.body.name || user.name,
      avatar: result.secure_url || user.avatar,
      cloudinary_id: result.public_id || user.cloudinary_id,
    };
    user = await File.findByIdAndUpdate(req.params.id, data, { new: true });
    res.json(user);
  } catch (err) {
    console.log(err);
  }
});

module.exports = router;
