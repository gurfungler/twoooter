const asyncHandler = require("express-async-handler");
exports.index = async (req, res, next) => {
  try {
    if (req.user) {
      res.render("index", { title: req.user.first_name, user: req.user });
    } else {
      res.render("index", { title: "twoooter" });
    }
  } catch {}
};
