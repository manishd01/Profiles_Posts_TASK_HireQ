const Post = require("../model/post");

const createPost = async (req, res) => {
  try {
    const { userId, content } = req.body;

    const newPost = new Post({
      user: userId,
      content: content,
    });

    // Save the post to the database
    await newPost.save();

    res.status(201).json({ message: "Post created successfully" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal server error" });
  }
};

const getPosts = async (req, res) => {
  try {
    // Retrieve all posts
    const posts = await Post.find();

    res.status(200).json(posts);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal server error" });
  }
};

module.exports = {
  createPost,
  getPosts,
};
