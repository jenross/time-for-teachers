const express = require("express");
const bodyParser = require("body-parser");
const pino = require("express-pino-logger")();
const mongoose = require("mongoose");
const routes = require("./routes");
const cors = require('cors');

require('dotenv').config();

const app = express();
app.use(bodyParser.urlencoded({ extended: false }));
app.use(pino);
const PORT = process.env.PORT || 3001;

// Define middleware here
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
// app.use(express.static('public'));
app.use(cors());
app.use(cors({
  credentials: true,
}));

// app.use(function(req, res, next) {
//   res.setHeader("Access-Control-Allow-Origin", 'http://localhost:3000');
//   res.setHeader('Access-Control-Allow-Methods', 'POST,GET,OPTIONS,PUT,DELETE');
//   res.setHeader('Access-Control-Allow-Headers', 'Content-Type,Accept');

//   next();
// });
// app.use((req, res, next) => {
//   res.header('Access-Control-Allow-Origin', '*');
//   next();
// });

if (process.env.NODE_ENV === "production") {
  app.use(express.static("client/build"));
}


app.use(routes);

const MONGODB_URI = process.env.MONGODB_STRING;

mongoose
  .connect(
    MONGODB_URI
  )
  .then(
    console.log("\n==================\nMongodb connected\n==================\n")
  );

app.listen(PORT, function() {
  console.log(`🌎  ==> API Server now listening on PORT ${PORT}!`);
});
