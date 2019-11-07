const router = require("express").Router();
const userRoutes = require("./users");
const userDataRoutes = require("./userDatas");

// user routes
router.use("/users", userRoutes);
router.use("/userdatas", userDataRoutes);

module.exports = router;
