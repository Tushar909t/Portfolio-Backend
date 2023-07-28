const express = require("express");
const UserController = require("../controller/UserController");
const AuthVerify = require("../middleware/AuthVerify");
const isAdmin = require("../middleware/AuthAdmin");
const IntroController = require("../controller/IntroController");
const router = express.Router();

router.post("/Regstrations", UserController.Regstrations);
router.post("/UserLogin", UserController.UserLogin);
router.post("/UserUpdate/:id", AuthVerify, UserController.UserUpdate);
router.get(
  "/UserProfileDetails",
  AuthVerify,
  UserController.UserProfileDetails
);
// Intro Router
router.post("/IntroCreate", AuthVerify, IntroController.IntroCreate);
router.post("/IntroUpdate/:id", AuthVerify, IntroController.IntroUpdate);
router.get("/IntroFind", IntroController.IntroFind);
module.exports = router;
