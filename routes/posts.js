const express = require("express");
const router = express.Router();
const postsController = require("../controllers/postsController");

// Create a post
router.post("/", postsController.createPost);

// Get all posts
router.get("/", postsController.getPosts);

module.exports = router;
