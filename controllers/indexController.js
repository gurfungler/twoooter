const asyncHandler = require("express-async-handler");
const Twoot = require("../models/twoot");
exports.index = async (req, res, next) => {
  try {
    if (req.user) {
      const allTwoots = await Twoot.find().sort({ timeStamp: 0 }).exec();
      console.log(req.user.first_name);
      console.log(req.user.status);
      res.render("index", {
        title: "Twoooter",
        user: req.user,
        twoot_list: allTwoots,
      });
    } else {
      res.render("index", {
        title: "Twoooter",
      });
    }
  } catch {}
};
