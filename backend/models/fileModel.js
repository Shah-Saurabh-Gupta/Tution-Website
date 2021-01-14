const mongoose = require("mongoose");
const fileSchema = new mongoose.Schema({
  filename: {
    type: String,
  },
  batch: {
    type: String,
  },
  avatar: {
    type: String,
  },
  cloudinary_id: {
    type: String,
  },
});

module.exports = File = mongoose.model("file", fileSchema);