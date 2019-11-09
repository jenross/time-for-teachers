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
  // create: function(req, res) {
  //   db.User.findOne({ email: req.body.email }).then(results => {
  //     const newData = {
  //       ...req.body,
  //       user: results._id
  //     };
  //     db.UserData.create(newData)
  //       .then(dbModel => {
  //         return db.User.findOneAndUpdate(
  //           { email: req.body.email, user: results._id },
  //           { $push: { userdata: dbModel._id } },
  //           { safe: true, upsert: true, new: true }
  //         );
  //       })
  //       .then(dbModel => res.json(dbModel))
  //       .catch(err => console.log(err));
  //   });
  // },
  create(req, res) {
    // console.log("the body: ", req.body);
    // console.log("the param: ", req.params.category);
    db.User.findOne({ email: req.body.email }).then(results => {
      // console.log(results._id);
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
