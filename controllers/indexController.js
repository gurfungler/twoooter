const asyncHandler = require("express-async-handler");
const Twoot = require("../models/twoot");
exports.index = async (req, res, next) => {
  try {
    if (req.user) {
      const allTwoots = await Twoot.find().sort({ timeStamp: 0 }).exec();
      res.render("index", {
        title: "Twoooter",
        first_name: req.user.first_name,
        twoot_list: allTwoots,
      });
    } else {
      res.render("index", {
        title: "Twoooter",
      });
    }
  } catch {}
};
