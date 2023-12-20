const asyncHandler = require("express-async-handler");
exports.sign_up_get = asyncHandler(async (req, res, next) => {
  res.render("sign-up");
});

exports.sign_up_post = asyncHandler(async (req, res, next) => {
  res.send("ra");
});
