const multer = require("multer");
const path = require("path");

// Multer config
module.exports = multer({
  storage: multer.diskStorage({}),
  fileFilter: (req, file, cb) => {
    let ext = path.extname(file.originalname);  
    if ( ext!==".pdf" && ext!==".jpg") {
      cb(new Error("File type is not supported"), false);
      return;
    }
    cb(null, true);
  },
});

// ext !== ".jpg" && ext !== ".jpeg" && ext !== ".png" ||