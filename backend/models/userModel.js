const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true, minlength: 5 },
  displayName: { type: String, required: true },
  batch: { type: String, required:true },
  address:{ type:String, required:true },
  phone:{ type:String, required: true},
  role:{ type:String, enum:['user','admin'],default:'user'},
});

module.exports = User = mongoose.model("user", userSchema);
