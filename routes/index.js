var express = require("express");
var router = express.Router();
const passport = require("passport");
const member_controller = require("../controllers/memberController");
const twoot_controller = require("../controllers/twootController");

/* GET home page. */
router.get("/", function (req, res, next) {
  res.render("index", { title: "Express" });
});

/// member routes ///

//GET member signup page
router.get("/sign_up", member_controller.member_create_get);

//POST member signup page
router.post("/sign_up", member_controller.member_create_post);

//GET member signin page
router.get("/sign_in", member_controller.member_sign_in_get);

//POST member signin page
router.post(
  "/sign_in",
  passport.authenticate("local"),
  member_controller.member_sign_in_post
);

/// twoot routes ///

//GET twoot create page
router.get("/create_twoot", twoot_controller.twoot_create_get);

module.exports = router;
