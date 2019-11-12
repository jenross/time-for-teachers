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
    db.User.findOne({ email: req.params.email }).then(results => {
      db.UserData.find({ user: results._id })
        .then(dbModel => {
          console.log("db_ model", dbModel);
          return res.json(dbModel);
        })
        .catch(err => console.log(err));
    });
  }
};
