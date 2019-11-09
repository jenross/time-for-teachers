const db = require("../models");

module.exports = {
  findAll: function(req, res) {
    db.UserData.findOne({ email: req.params.email })
      .then(dbModel => res.json(dbModel))
      .catch(err => res.status(422).json(err));
  },
  create: function(req, res) {
    db.User.findOne({ email: req.body.email }).then(results => {
      const newData = {
        ...req.body,
        user: results._id
      };
      db.UserData.create(newData)
        .then(dbModel => {
          // console.log("the res ============", results._id);
          return db.User.findOneAndUpdate(
            { email: req.body.email, user: results._id },
            { $push: { userdata: dbModel._id } },
            { safe: true, upsert: true, new: true }
          );
        })
        .then(dbModel => res.json(dbModel))
        .catch(err => console.log(err));
    });
  },
  findAll: function(req, res) {
    db.UserData.findOne({ email: req.params.email })
      .then(dbModel => res.json(dbModel))
      .catch(err => res.status(422).json(err));
  },
};
