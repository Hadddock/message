const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const UserSchema = new Schema({
  first_name: { type: String, required: true, maxLength: 100 },
  family_name: { type: String, required: true, maxLength: 100 },
  username: { type: String, required: true, minlength: 3, maxLength: 64 },
  password: { type: String, required: true, minLength: 8 },
  membership_status: { type: Boolean, required: true },
});

UserSchema.virtual("full_name").get(function () {
  return `${first_name} ${family_name}`;
});

module.exports = mongoose.model("User", UserSchema);
