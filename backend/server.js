const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
require("dotenv").config();


// set up express
const app = express();
app.use(cors());
app.use(express.json());
const PORT = process.env.PORT || 5000;
console.log("Server starting...");
app.listen(PORT, () => console.log(`Server started on port: ${PORT}`));


// set up routes
app.use("/notice", require("./routes/noticeRouter"));
app.use("/admin", require("./routes/adminRouter"));
app.use("/user", require("./routes/userRouter"));
app.use("/files", require("./routes/filesRoute"));


// if(process.env.NODE_ENV === 'production'){
//   app.use(express.static('frontend/build'));
// }

// set up mongoose
console.log("Connecting to MongoDB...");
mongoose.connect(
  process.env.MONGODB_CONNECTION_STRING,
  {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndex: true,
    useFindAndModify: false
  },
  err => {
    if (err) throw err;
    console.log("MongoDB connection established");
  }
);


// "build": "cd .. && cd frontend && npm run build",
    // "install-client": "cd .. && cd frontend && npm install",
    // "heroku-postbuild": "npm run install-client && npm run build",