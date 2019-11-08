const router = require("express").Router();
const usersController = require("../../controllers/usersController");

router
  .route("/")
  .get(usersController.findAll)
  .post(usersController.create);

router.route("/:email").get(usersController.findAll);

router.route("/data/:email").get(usersController.findAllUserData);

module.exports = router;
