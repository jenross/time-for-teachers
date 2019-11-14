const express = require("express");
const bodyParser = require("body-parser");
const pino = require("express-pino-logger")();
const mongoose = require("mongoose");
const routes = require("./routes");


const app = express();
app.use(bodyParser.urlencoded({ extended: false }));
app.use(pino);
const PORT = process.env.PORT || 3000;

// Define middleware here
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.use(express.static("client/build"));


app.use(routes);

mongoose
  .connect(
    "mongodb+srv://plake492:6HEnJXGf8umfYoEr@test-i2ely.mongodb.net/test?retryWrites=true&w=majority"
  )
  .then(
    console.log("\n==================\nMongodb connected\n==================\n")
  );

app.listen(PORT, function() {
  console.log(`🌎  ==> API Server now listening on PORT ${PORT}!`);
});
