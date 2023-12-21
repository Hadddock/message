const express = require("express");
const router = express.Router();

const user_controller = require("../controllers/userController");
const post_controller = require("../controllers/postController");

router.get("/sign-up", user_controller.sign_up_get);
router.post("/sign-up", user_controller.sign_up_post);

router.get("/login", user_controller.login_get);
router.post("/login", user_controller.login_post);

router.post("/logout", user_controller.logout_post);

router.get("/create-post", post_controller.create_post_get);
router.post("/create-post", post_controller.create_post_post);

module.exports = router;
