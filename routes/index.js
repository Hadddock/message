var express = require("express");
var router = express.Router();

module.exports = router;

// About page route.
router.get("/sign-up", function (req, res) {
  res.render("sign-up");
});
