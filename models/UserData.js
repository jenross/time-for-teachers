const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const userDataSchema = new Schema({
  time: [
    {
      lessonPlanning: { type: String, required: false },
      grading: { type: String, required: false },
      specialEventPlanning: { type: String, required: false },
      communications: { type: String, required: false },
      paperwork: { type: String, required: false },
      training: { type: String, required: false },
      continuingEducation: { type: String, required: false },
      other: { type: String, required: false },
      date: { type: Date, default: Date.now }
    }
  ],
  user: { type: Schema.Types.ObjectId, ref: "User" },
  date: { type: Date, default: Date.now }
});
const UserData = mongoose.model("UserData", userDataSchema);

module.exports = UserData;
