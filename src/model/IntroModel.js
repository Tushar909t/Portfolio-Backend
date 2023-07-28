const mongoose = require("mongoose");

const DataSchema = mongoose.Schema(
  {
    Name: { type: String },
    Decs: { type: String },
    HireLink: { type: String },
    GitLink: { type: String },
    InstLink: { type: String },
    LinkDinLink: { type: String },
    Image: { type: String },
    createDate: { type: Date, default: Date.now() },
  },
  { versionKey: false }
);
const IntroModel = mongoose.model("intro", DataSchema);
module.exports = IntroModel;
