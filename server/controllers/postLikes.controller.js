import Posts from '../models/postModel.js';

const likePost = async (req, res) => {
  try {
    const { postId, userId } = req.body;

    // Check if the user has already liked the post
    const post = await Posts.findById(postId);
    if (!post) {
      return res.status(404).json({ message: "Post not found" });
    }

    // Check if the user has already liked the post
    if (post.likes.includes(userId)) {
      return res.status(400).json({ message: "You have already liked this post" });
    }

    // Add the user's ID to the likes array of the post
    post.likes.push(userId);
    await post.save();

    return res.status(200).json({ message: "Post liked successfully" });
  } catch (error) {
    console.error("Error liking post:", error);
    return res.status(500).json({ message: "Internal server error" });
  }
};

export default likePost;
