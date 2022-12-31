const { Router } = require("express"),
    { getAllPosts, createPost, updatePost, deletePost } = require("../controllers/posts.controllers")

const router = Router();

router.get("/posts", getAllPosts);
router.post("/posts", createPost);
router.put("/posts/like/:id", updatePost);
router.delete("/posts/:id", deletePost);

module.exports = router;