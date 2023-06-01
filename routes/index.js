var express = require("express");
var router = express.Router();
const member_controller = require("../controllers/memberController");

/* GET home page. */
router.get("/", function (req, res, next) {
  res.render("index", { title: "Express" });
});

router.get("/sign_up", member_controller.member_create_get);

router.get("/sign_in", member_controller.member_sign_in_get);

module.exports = router;
