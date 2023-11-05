const express = require("express");

const router = express.Router();

const { createUser, userLogin } = require("../controllers/UsersController");
const {
  userAuthentication,
  adminAuthentication,
} = require("../controllers/authentication");

router.post("/signup", createUser);
router.post("/login", userLogin);
// router.get("/all_users", isAuthenticated, getAllUsers);

module.exports = router;
