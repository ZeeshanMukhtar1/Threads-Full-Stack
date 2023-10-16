import User from '../models/userModel.js';
import posts from '../models/postModel.js';
import Post from '../models/postModel.js';

const createPost = async (req, res) => {
  try {
    const { postedBy, text, image } = req.body;
    if (!postedBy || !text) {
      return res
        .status(400)
        .json({ message: 'postedBy and text fields are required..!' });
    }
    const user = await User.findById(postedBy);
    if (!user) {
      return res.status(400).json({ message: 'User not found' });
    }
    if (user._id.toString() !== req.user._id.toString()) {
      return res.status(400).json({
        message: 'u are not authorized to create a post for someone else..! ',
      });
    }

    const maxLength = 500;
    if (text.length > maxLength) {
      return res.status(400).json({
        message: `Text length should be less than ${maxLength} characters..!`,
      });
    }

    const newPost = new Post({
      postedBy,
      text,
      image,
    });

    await newPost.save();
    res
      .status(201)
      .json({ message: 'Post created successfully', post: newPost });
  } catch (error) {
    res.status(500).json({ message: error.message });
    console.log(error.message);
  }
};

const getPost = async (req, res) => {
  try {
    // getting post by id
    const post = await Post.findById(req.params.id);
    // if post not found
    if (!post) {
      return res.status(404).json({ message: 'Post not found' });
    }
    // if post found
    res.status(200).json({ message: 'Post fetched successfully', post });
  } catch (error) {
    res.status(500).json({ message: error.message });
    console.log(error.message);
  }
};

const deletePost = async (req, res) => {
  try {
    // Getting the post by id
    const post = await Post.findById(req.params.id);

    // If the post is not found
    if (!post) {
      return res.status(404).json({ message: 'Post not found' });
    }

    if (post.postedBy.toString() !== req.user._id.toString()) {
      return res.status(401).json({
        message: "You are not authorized to delete someone else's post.",
      });
    }

    // If the post is found, remove it
    await Post.findByIdAndRemove(req.params.id);

    res.status(200).json({ message: 'Post deleted successfully', post });
  } catch (error) {
    res.status(500).json({ message: error.message });
    console.log(error.message);
  }
};

const likeUnlikePost = async (req, res) => {
  try {
    const { id: postId } = req.params;
    const userId = req.user._id;
    const post = await Post.findById(postId);

    if (!post) {
      return res.status(404).json({ message: 'Post not found' });
    }
    const userLikedPost = post.likes.includes(userId);
    if (userLikedPost) {
      // unlike the post
      await Post.updateOne({ _id: postId }, { $pull: { likes: userId } });
      res.status(200).json({ message: 'Post unliked successfully' });
    } else {
      // like the post
      post.likes.push(userId);
      await post.save();
      res.status(200).json({ message: 'Post liked successfully' });
    }
  } catch (error) {
    res.status(500).json({ message: error.message });
    console.log(error.message);
  }
};

const replyToPost = async (req, res) => {
  try {
    const { text } = req.body;
    const postId = req.params.id;
    const userId = req.user._id;
    const userProfilePic = req.user.profilePic;
    const username = req.user.username;

    if (!text) {
      return res.status(400).json({ message: 'Text field is required..!' });
    }
    const post = await Post.findById(postId);
    if (!post) {
      return res.status(404).json({ message: 'Post not found' });
    }
    const reply = {
      text,
      userId,
      userProfilePic,
      username,
    };
    post.replies.push(reply);
    await post.save();
    res.status(200).json({ message: 'Reply added successfully', post });
  } catch (error) {
    res.status(500).json({ message: error.message });
    console.log(error.message);
  }
};
export default { createPost, getPost, deletePost, likeUnlikePost, replyToPost };
