const asyncHandler = require("express-async-handler");
const { body, validationResult } = require("express-validator");
const member = require("../models/member");
// Display member create form on GET.
exports.member_create_get = (req, res, next) => {
  res.render("sign_up", { title: "Sign up" });
};

// Handle member create on POST.
exports.member_create_post = [
  // Validate and sanitize fields.
  body("first_name")
    .trim()
    .isLength({ min: 1 })
    .escape()
    .withMessage("First name must be specified.")
    .isAlphanumeric()
    .withMessage("First name has non-alphanumeric characters."),
  body("last_name")
    .trim()
    .isLength({ min: 1 })
    .escape()
    .withMessage("last name must be specified.")
    .isAlphanumeric()
    .withMessage("last name has non-alphanumeric characters."),
  body("email"),
  body("password")
    .trim()
    .isLength({ min: 1 })
    .escape()
    .withMessage("password must be specified"),
  body("status"),

  // Process request after validation and sanitization.
  asyncHandler(async (req, res, next) => {
    // Extract the validation errors from a request.
    const errors = validationResult(req);

    // Create Member object with escaped and trimmed data
    const member = new Member({
      first_name: req.body.first_name,
      last_name: req.body.last_name,
      email: req.body.email,
      password: req.body.password,
      status: true,
    });

    if (!errors.isEmpty()) {
      // There are errors. Render form again with sanitized values/errors messages.
      res.render("sign_up", {
        title: "Sign up",
        member: member,
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

// Display member log in form get.
exports.member_sign_in_get = (req, res, next) => {
  res.render("sign_in", { title: "Sign in" });
};
