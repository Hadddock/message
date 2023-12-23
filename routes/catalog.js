const express = require("express");
const router = express.Router();

const user_controller = require("../controllers/userController");
const post_controller = require("../controllers/postController");

router.get("/sign-up", user_controller.sign_up_get);
router.post("/sign-up", user_controller.sign_up_post);

router.get("/login", user_controller.login_get);
router.post("/login", user_controller.login_post);

router.get("/join-club", user_controller.join_club_get);
router.post("/join-club", user_controller.join_club_post);

router.get("/become-admin", user_controller.become_admin_get);
router.post("/become-admin", user_controller.become_admin_post);

router.post("/logout", user_controller.logout_post);

router.get("/create-post", post_controller.create_post_get);
router.post("/create-post", post_controller.create_post_post);

router.post("/delete-post", post_controller.delete_post_post);

router.get("/", post_controller.home_page);

module.exports = router;
