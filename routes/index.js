var express = require("express");
var router = express.Router();
const passport = require("passport");
const session = require("express-session");
const member_controller = require("../controllers/memberController");
const twoot_controller = require("../controllers/twootController");
const index_controller = require("../controllers/indexController");

/* GET home page. */
router.get("/", index_controller.index);

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
  passport.authenticate("local", { failureRedirect: "/sign_in" }),
  function (req, res) {
    res.redirect("/");
  },
  member_controller.member_sign_in_post
);

//POST member signout page
router.get("/sign_out", function (req, res, next) {
  req.logout(function (err) {
    if (err) {
      return next(err);
    }
    req.session.destroy();
    res.redirect("/");
  });
});
/// twoot routes ///

//GET twoot create page
router.get("/create_twoot", twoot_controller.twoot_create_get);

//POST twoot create page
router.post("/create_twoot", twoot_controller.twoot_create_post);

module.exports = router;
