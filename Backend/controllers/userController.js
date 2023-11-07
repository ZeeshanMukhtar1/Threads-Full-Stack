import User from "../models/userModel.js";
import bcrypt from "bcrypt"; // Importing bcrypt for password hashing
import generateTokenAndSetCookie from "../utills/helpers/generateTokenAndSetCookie.js";

const getUserProfile = async (req, res) => {
  const { username } = req.params;
  try {
    const userProfile = await User.findOne({ username: username })
      .select("-password")
      .select("-updatedAt");
    if (!userProfile) {
      return res.status(404).json({ message: "User not found" });
    }
    res.status(200).json({ user: userProfile });
  } catch (error) {
    res.status(500).json({ error: error.message });
    console.log("Error in getUserProfile: ", error.message);
  }
};

const signupUser = async (req, res) => {
  try {
    const { name, email, username, password, profilepic, bio } = req.body;
    // Check if a user with the same email or username already exists
    const user = await User.findOne({
      $or: [{ email: email }, { username: username }],
    });
    if (user) {
      return res.status(400).json({ error: "User already exists" }); // Return early if user exists
    }

    // Generate a salt and hash the password
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    // Create a new User instance with hashed password
    const newUser = new User({
      name,
      email,
      username,
      password: hashedPassword,
      profilepic, // Include the profile picture in the user object
      bio
    });

    // Save the new user to the database
    const newuser = await newUser.save();
    if (newuser) {
      generateTokenAndSetCookie(newuser._id, res); // Generate a token and set cookie
      // If user registration is successful, send a response with user details
      return res.status(201).json({
        _id: newuser._id,
        name: newuser.name,
        email: newuser.email,
        username: newuser.username,
        bio: newuser.bio,
        profilepic: newuser.profilepic, // Include the profile picture in the response
      });
    } else {
      // If user registration fails for any reason, return an error message
      return res.status(400).json({ error: "Invalid user data" });
    }
  } catch (error) {
    // Handle server errors and send an error response
    console.log("Error in signupUser: ", error.message);
    return res.status(500).json({ error: error.message });
  }
};

const loginUser = async (req, res) => {
  const { username, password } = req.body;

  try {
    // Query the User model from the database
    const foundUser = await User.findOne({ username: username });

    if (!foundUser) {
      return res.status(400).json({
        error: "This user does not exist. Please create a new account.",
      });
    }

    // Check if the password matches the hashed password in the database
    const isPasswordMatch = await bcrypt.compare(password, foundUser.password);

    if (!isPasswordMatch) {
      return res.status(400).json({ error: "Invalid username or password" });
    }

    // Generate a token and set a cookie for the authenticated user
    generateTokenAndSetCookie(foundUser._id, res);

    // Respond with user details
    return res.status(200).json({
      _id: foundUser._id,
      name: foundUser.name,
      email: foundUser.email,
      username: foundUser.username,
      bio: foundUser.bio,
      profilePic: foundUser.profilePic,
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
    console.log("Error in loginUser: ", error.message);
  }
};

const logoutUser = (req, res) => {
  // clear the cookie
  res.cookie("jwt", "", { maxAge: 0 });
  // send a response
  res.status(200).json({ message: "User logged out successfully" });
  try {
  } catch (error) {
    res.status(500).json({ message: error.message });
    console.log("Error in logoutUser: ", error.message);
  }
};

const followUnfollowUser = async (req, res) => {
  try {
    const { id } = req.params;
    const userToModify = await User.findById(id);
    const currentUser = await User.findById(req.user._id);

    // Check if the user is trying to follow/unfollow themselves
    if (id === req.user._id.toString()) {
      return res
        .status(400)
        .json({ error: "You cannot follow/unfollow yourself" });
    }

    if (!userToModify || !currentUser) {
      return res.status(404).json({ message: "User not found" });
    }

    const isFollowing = currentUser.following.includes(id);

    if (isFollowing) {
      // Unfollow the user
      await User.findByIdAndUpdate(req.user._id, { $pull: { following: id } }); // Remove the user from the following array
      await User.findByIdAndUpdate(id, { $pull: { followers: req.user._id } }); // Remove the user from the followers array
      res.status(200).json({ message: "User unfollowed successfully" });
    } else {
      // Follow the user
      await User.findByIdAndUpdate(req.user._id, { $push: { following: id } }); // Add the user to the following array
      await User.findByIdAndUpdate(id, { $push: { followers: req.user._id } }); // Add the user to the followers array
      res.status(200).json({ message: "User followed successfully" });
    }
  } catch (error) {
    res.status(500).json({ error: error.message });
    console.log("Error in follow/unfollow: ", error.message);
  }
};

const updateUser = async (req, res) => {
  const { name, email, username, password, bio, profilePic } = req.body;
  const userID = req.user._id;
  try {
    let user = await User.findById(userID);
    if (!user) {
      return res.status(404).json({ error: "User not found" });
    }
    if (req.params.id !== userID.toString()) {
      return res
        .status(401)
        .json({ error: "You are not authorized to update this user" });
    }

    if (password) {
      const salt = await bcrypt.genSalt(10);
      const hashedPassword = await bcrypt.hash(password, salt);
      user.password = hashedPassword;
    }
    user.name = name || user.name;
    user.email = email || user.email;
    user.username = username || user.username;
    user.bio = bio || user.bio;
    user.profilePic = profilePic || user.profilePic;
    user = await user.save();
    res.status(200).json({ message: "User updated successfully", user });
  } catch (error) {
    res.status(500).json({ error: error.message });
    console.log("Error in updateUser: ", error.message);
  }
};

export default {
  signupUser,
  loginUser,
  logoutUser,
  followUnfollowUser,
  updateUser,
  getUserProfile,
};
