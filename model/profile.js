const mongoose = require("mongoose");
const Schema = mongoose.Schema;
//Schema.Types.ObjectId
const profileSchema = new Schema({
  user: { type: String, unique: true, required: true },
  bio: { type: String },
});

module.exports = mongoose.model("Profile", profileSchema);
