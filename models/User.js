const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const userSchema = new Schema({
  // _id: { type: String, value: "cognito_id" },
  username: { type: String, required: true },
  email: { type: String, required: true },
  // cognito_id: { type: String, required: true },
  userdata: [{ type: Schema.Types.ObjectId, ref: "UserData" }],
  date: { type: Date, default: Date.now }
});

const User = mongoose.model("User", userSchema);

module.exports = User;
