const express = require("express");
const postsController = require("../controllers/posts.controller.js");
const router = express.Router();
const { upload } = require("../middleware/multer.middleware");
const { tokenMiddleware } = require("../middleware/auth.middleware");

router.get("/", postsController.getAllPosts);
router.get("/:id", postsController.getPostById);
router.post("/", tokenMiddleware, postsController.createPost);
router.put("/:id", tokenMiddleware, postsController.updatePost);
router.delete("/:id", tokenMiddleware, postsController.deletePost);
router.post(
  "/media",
  tokenMiddleware,
  upload.array("media", 10),
  postsController.uploadPostMedia
);

router.get("/search", postsController.searchPosts);
router.get("/my_posts", tokenMiddleware, postsController.getMyPosts);
router.get("/user/:userId", postsController.getPostsByUserId);

router.get("/tag/:tag", postsController.getPostsByTag);

router.get("/popular", postsController.getPostsByPopularity);
router.get(
  "/date_range/:start_date/:end_date",
  postsController.getPostsByDateRange
);
router.get("/author/:authorId", postsController.getPostsByAuthor);

router.get("/category/:categoryId", postsController.getPostsByCategory);

module.exports = {
  router,
  path: "/posts",
};
