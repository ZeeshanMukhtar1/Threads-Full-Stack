import User from '../models/userModel.js';
import posts from '../models/postModel.js';
import Post from '../models/postModel.js';
import { v2 as cloudinary } from 'cloudinary';

const createPost = async (req, res) => {
  try {
    const { postedBy, text } = req.body;
    let { img } = req.body;
    if (!postedBy || !text) {
      return res
        .status(400)
        .json({ error: 'postedBy and text fields are required..!' });
    }
    const user = await User.findById(postedBy);
    if (!user) {
      return res.status(400).json({ error: 'User not found' });
    }
    if (user._id.toString() !== req.user._id.toString()) {
      return res.status(400).json({
        error: 'u are not authorized to create a post for someone else..! ',
      });
    }

    const maxLength = 500;
    if (text.length > maxLength) {
      return res.status(400).json({
        error: `Text length should be less than ${maxLength} characters..!`,
      });
    }

    if (img) {
      const uploadedResponse = await cloudinary.uploader.upload(img);
      img = uploadedResponse.secure_url;
    }

    const newPost = new Post({
      postedBy,
      text,
      img,
    });

    await newPost.save();
    res.status(201).json(newPost);
  } catch (error) {
    res.status(500).json({ error: error.message });
    console.log(error.message);
  }
};

const getPost = async (req, res) => {
  try {
    // getting post by id
    const post = await Post.findById(req.params.id);
    // if post not found
    if (!post) {
      return res.status(404).json({ error: 'Post not found' });
    }
    // if post found
    res.status(200).json(post);
  } catch (error) {
    res.status(500).json({ error: error.message });
    console.log(error.message);
  }
};

const deletePost = async (req, res) => {
  try {
    // Getting the post by id
    const post = await Post.findById(req.params.id);

    // If the post is not found
    if (!post) {
      return res.status(404).json({ error: 'Post not found' });
    }

    if (post.postedBy.toString() !== req.user._id.toString()) {
      return res.status(401).json({
        error: "You are not authorized to delete someone else's post.",
      });
    }

    // delete image from cloudinary as well
    if (post.img) {
      const imgId = post.img.split('/').pop().split('.')[0];
      await cloudinary.uploader.destroy(imgId);
    }

    // If the post is found, remove it
    await Post.findByIdAndRemove(req.params.id);

    res.status(200).json({ message: 'Post deleted successfully', post });
  } catch (error) {
    res.status(500).json({ error: error.message });
    console.log(error.message);
  }
};

const likeUnlikePost = async (req, res) => {
  try {
    const { id: postId } = req.params;
    const userId = req.user._id;
    const post = await Post.findById(postId);

    if (!post) {
      return res.status(404).json({ error: 'Post not found' });
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
    res.status(500).json({ error: error.message });
    console.log(error.message);
  }
};

const replyToPost = async (req, res) => {
  try {
    const { text, user } = req.body;
    const postId = req.params.id;

    const userId = req.body.user._id;
    const foundUser = await User.findById(userId);

    if (!foundUser) {
      console.log('User not found');
      return res.status(404).json({ error: 'User not found' });
    }

    const profilepic = foundUser.profilePic;
    const username = foundUser.username;

    if (!text) {
      return res.status(400).json({ error: 'Text field is required..!' });
    }

    const post = await Post.findById(postId);
    if (!post) {
      return res.status(404).json({ error: 'Post not found' });
    }

    const reply = {
      text,
      userId,
      profilepic,
      username,
    };

    post.replies.push(reply);
    await post.save();
    console.log('Reply: ', post);

    res.status(200).json({ message: 'Reply added successfully', post });
  } catch (error) {
    res.status(500).json({ error: error.message });
    console.error(error.message);
  }
};

const getFeedPosts = async (req, res) => {
  try {
    const userId = req.user._id;
    const user = await User.findById(userId);

    if (!user) {
      return res.status(404).json({ error: 'User not found' });
    }
    const following = user.following;
    const feedPosts = await Post.find({ postedBy: { $in: following } }).sort({
      createdAt: -1,
    });
    res.status(200).json(feedPosts);
  } catch (error) {
    res.status(500).json({ error: error.message });
    console.log(error.message);
  }
};

const getUserPosts = async (req, res) => {
  const { username } = req.params;

  try {
    // const user = await User.findOne({ username: username });
    const user = await User.findOne({ username: username }).select(
      'profilePic'
    );
    if (!user) {
      return res.status(404).json({ error: 'User not found' });
      // return res.status(404).json({ error: 'User not found' });
    }
    const posts = await Post.find({ postedBy: user._id }).sort({
      createdAt: -1,
    });
    res.status(200).json(posts);
  } catch (error) {
    res.status(500).json({ error: error.message });
    console.log(error.message);
  }
};
export default {
  createPost,
  getPost,
  deletePost,
  likeUnlikePost,
  replyToPost,
  getFeedPosts,
  getUserPosts,
};
