const { body, validationResult } = require("express-validator");
const asyncHandler = require("express-async-handler");
const User = require("./../models/user");
exports.sign_up_get = asyncHandler(async (req, res, next) => {
  res.render("sign-up");
});

exports.sign_up_post = [
  //validate and sanitize
  body("first_name")
    .trim()
    .isLength({ min: 1, max: 100 })
    .withMessage("First name must be between 1-100 characters")
    .escape(),
  body("family_name", "Family name must be between 1-100 characters")
    .trim()
    .isLength({ min: 1, max: 100 })
    .escape(),
  body("username")
    .trim()
    .isLength({ min: 3, max: 64 })
    .withMessage("Username must be between 3-64 characters")
    .custom(async (value) => {
      const usernameTaken = await User.findOne({ username: value }).exec();
      if (usernameTaken) {
        throw new Error("Username is already taken");
      }
    })
    .escape(),
  body("password", "Password must be at least 8 characters")
    .trim()
    .isLength({ min: 8 })
    .escape(),
  body("confirm_password", "Passwords do not match")
    .trim()
    .custom((value, { req }) => {
      return value == req.body.password;
    }),

  asyncHandler(async (req, res, next) => {
    //extract validation errors from request
    const errors = validationResult(req);
    //create new user object
    const user = new User({
      first_name: req.body.first_name,
      family_name: req.body.family_name,
      username: req.body.username,
      password: req.body.password,
      membership_status: false,
    });
    //render form again with errors
    if (!errors.isEmpty()) {
      res.render("sign-up", { user: user, errors: errors.array() });
      return;
    } else {
      await user.save();
      res.send("User created!");
    }
  }),
];
