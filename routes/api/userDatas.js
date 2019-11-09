const router = require("express").Router();
const userDatasController = require("../../controllers/userDatasController");

router.route("/").post(userDatasController.create);

router.route("/:email").get(userDatasController.findAll);

module.exports = router;
