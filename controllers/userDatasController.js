const db = require("../models");

module.exports = {
  findAll(req, res) {
    console.log("Email: ", req.params.email);
    db.User.findOne({ email: req.params.email }).then(results => {
      console.log("the Results", results._id);
      db.UserData.findOne({ user: results._id })
        .then(dbModel => res.json(dbModel))
        .catch(err => res.status(422).json(err));
    });
  },

  createNewTimeInput(req, res) {
    console.log(req.body);
    db.User.findOne({ email: req.body.email }).then(results => {
      db.UserData.findOneAndUpdate(
        { user: results._id },
        {
          $push: { time: req.body }
        }
      )
        .then(dbModel => {
          console.log("the dbModel", dbModel);
          res.json(dbModel);
        })
        .catch(err => console.log(err));
    });
  },

  createAccumulatedData(req, res) {
    db.User.findOne({ email: req.params.email }).then(results => {
      console.log("THE BODY", req.body);
      db.UserData.findOneAndUpdate(
        { user: results._id },
        {
          $push: { comparisonTime: req.body }
        }
      )
        .then(dbModel => {
          console.log("the dbModel", dbModel);
          res.json(dbModel);
        })
        .catch(err => console.log(err));
    });
  },

  //? Creates New Empty Document if User Doesn't Have Any UserData //
  createNewDocument(req, res) {
    console.log("\n===============I've been hit=================\n");
    db.User.findOne({ email: req.params.email }).then(results => {
      console.log("\n=========== the reuslts here ============", results);
      db.UserData.create({ user: results._id })
        .then(dbModel => res.json(dbModel))
        .catch(err => res.status(422).json(err));
    });
  }
};
