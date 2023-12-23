const { body, validationResult } = require("express-validator");
const asyncHandler = require("express-async-handler");
const Post = require("./../models/post");

exports.create_post_post = (req, res, next) => {
  req.logout((err) => {
    if (err) {
      return next(err);
    }
    res.redirect("/");
  });
};

exports.create_post_get = (req, res, next) => {
  res.render("createMessage");
};

exports.delete_post_post = asyncHandler(async (req, res, next) => {
  await Post.findByIdAndDelete(req.body.post_id).exec();
  res.redirect("/");
});

exports.home_page = asyncHandler(async (req, res, next) => {
  let allPosts;
  if (req.user && req.user.membership_status) {
    allPosts = await Post.find()
      .populate("user")
      .sort({ date_created: 1 })
      .exec();
  } else {
    allPosts = await Post.find({}).sort({ date_created: 1 }).exec();
  }
  res.render("index", { posts: allPosts });
});

exports.create_post_post = [
  //validate and sanitize
  body("message")
    .trim()
    .isLength({ min: 1, max: 60000 })
    .withMessage("Post must be between 1-60000 characters")
    .escape(),
  asyncHandler(async (req, res, next) => {
    //extract validation errors from request
    const errors = validationResult(req);

    //create new user object
    const post = new Post({
      user: req.user._id,
      date_created: new Date(),
      message: req.body.message,
    });
    //render form again with errors
    if (!errors.isEmpty()) {
      res.render("createMessage", { post: post, errors: errors.array() });
      return;
    } else {
      await post.save();
      res.redirect("/");
    }
  }),
];
