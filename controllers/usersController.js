const db = require("../models");

module.exports = {
  findAll: function(req, res) {
    db.User.find(req.query)
      .sort({ date: -1 })
      .then(dbModel => res.json(dbModel))
      .catch(err => res.status(422).json(err));
  },

  create: function(req, res) {
    db.User.create(req.body)
      .then(dbModel => res.json(dbModel))
      .catch(err => res.status(422).json(err));
  },

  findAllUserData: function(req, res) {
    // console.log("findAllUserData ========== is getting hit");
    db.User.findOne({ email: req.params.email }).then(results => {
      // console.log("results", results);
      db.UserData.find({ user: results._id })

        .then(dbModel => {
          console.log("db_ model", dbModel);
          return res.json(dbModel);
          // return db.User.findOneAndUpdate(
          //   { email: req.body.email, user: results._id },
          //   { $push: { userdata: dbModel._id } },
          //   { safe: true, upsert: true, new: true }
          // );
        })
        .catch(err => console.log(err));
    });
  }
};
