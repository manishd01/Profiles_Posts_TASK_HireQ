const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const postSchema = new Schema({
  user: { type: String, ref: "User", required: true },
  content: { type: String, required: true },
});

module.exports = mongoose.model("Post", postSchema);
