const mongoose = require("mongoose");
const DataSchema = mongoose.Schema(
  {
    email: { type: String, require: true, unique: true },
    firstname: { type: String },
    lastname: { type: String },
    password: { type: String, require: true },
    mobile: { type: String },
    photo: { type: String },
    role: { type: String, enum: ["user", "admin"], default: "user" },
    createDate: { type: Date, default: Date.now() },
  },
  { versionKey: false }
);
const UserModel = mongoose.model("users", DataSchema);
module.exports = UserModel;
