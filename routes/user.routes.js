const express = require("express");
const router = express.Router(); // enable the routing

// import the controller
const {
    registerUser,
    login,
    getHome
} = require("../controller/user.controller");

// routes
router.post("/register", registerUser);
router.post("/login", login);
router.get("/home", getHome)

module.exports = router;