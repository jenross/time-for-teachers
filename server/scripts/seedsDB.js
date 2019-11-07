const mongoose = require("mongoose");
const db = require("../models");

// This file empties the Books collection and inserts the books below

mongoose.connect(
  process.env.MONGODB_URI ||
    "mongodb+srv://plake492:6HEnJXGf8umfYoEr@test-i2ely.mongodb.net/test?retryWrites=true&w=majority"
);

const userSeed = [
  {
    username: "Trevor Noah",
    email: "trever@gmail.com"
  }
];

db.User.collection
  .insertMany(userSeed)
  .then(data => {
    console.log(data.result.n + " records inserted!");
    process.exit(0);
  })
  .catch(err => {
    console.error(err);
    process.exit(1);
  });
