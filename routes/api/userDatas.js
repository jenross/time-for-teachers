const router = require("express").Router();
const userDatasController = require("../../controllers/userDatasController");

router.route("/").post(userDatasController.createNewDocument);

router.route("/:category").post(userDatasController.createNewTimeInput);

router.route("/:email").get(userDatasController.findAll);

router.route("/create/:email").post(userDatasController.createNewDocument);

router
  .route("/createall/:email")
  .post(userDatasController.createAccumulatedData);

module.exports = router;
