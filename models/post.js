const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const PostSchema = new Schema({
  user: { type: Schema.Types.ObjectId, ref: "User" },
  dateCreated: { type: Date },
  content: { type: String, required: true, maxLength: 60000 },
});

module.exports = mongoose.model("Post", PostSchema);
