const asyncHandler = require("express-async-handler");
const { body, validationResult } = require("express-validator");
const Twoot = require("../models/twoot");

// Display twoot create form on GET.
exports.twoot_create_get = (req, res, next) => {
  res.render("create_twoot", { title: "Twoot" });
};

// Handle twoot create on POST.
exports.twoot_create_post = [
  // Validate and sanitize fields.
  body("title")
    .trim()
    .isLength({ min: 1 })
    .escape()
    .withMessage("First name must be specified."),
  body("twoot")
    .trim()
    .isLength({ min: 1 })
    .escape()
    .withMessage("Twoot required"),

  // Process request after validation and sanitization.
  asyncHandler(async (req, res, next) => {
    // Extract the validation errors from a request.
    const errors = validationResult(req);

    // Create Member object with escaped and trimmed data
    const twoot = new Twoot({
      title: req.body.title,
      body: req.body.body,
    });

    if (!errors.isEmpty()) {
      // There are errors. Render form again with sanitized values/errors messages.
      res.render("create_twoot", {
        title: "Twoot",
        twoot: twoot,
        errors: errors.array(),
      });
      return;
    } else {
      // Data from form is valid.

      // Save member.
      await member.save();
      // Redirect to home.
      res.redirect("/");
    }
  }),
];
