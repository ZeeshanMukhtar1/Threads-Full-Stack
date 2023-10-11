import User from '../models/userModel.js';
import bcrypt from 'bcrypt'; // Importing bcrypt for password hashing
import generateTokenAndSetCookie from '../utills/helpers/generateTokenAndSetCookie.js';

const signupUser = async (req, res) => {
  try {
    const { name, email, username, password } = req.body;
    // Check if a user with the same email or username already exists
    const user = await User.findOne({
      $or: [{ email: email }, { username: username }],
    });
    if (user) {
      return res.status(400).json({ message: 'User already exists' }); // Return early if user exists
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
      });
    } else {
      // If user registration fails for any reason, return an error message
      return res.status(400).json({ message: 'Invalid user data' });
    }
  } catch (error) {
    // Handle server errors and send an error response
    console.log('Error in signupUser: ', error.message);
    return res.status(500).json({ message: error.message });
  }
};

const loginUser = async (req, res) => {
  const { username, password } = req.body;

  try {
    // Query the User model from the database, using a different variable name
    const foundUser = await User.findOne({ username: username });

    if (!foundUser) {
      return res.status(400).json({ message: 'Invalid username or password' });
    }

    // Check if the password matches the hashed password in the database
    const isPasswordMatch = await bcrypt.compare(password, foundUser.password);

    if (!isPasswordMatch) {
      return res.status(400).json({ message: 'Invalid username or password' });
    }

    // Generate a token and set a cookie for the authenticated user
    generateTokenAndSetCookie(foundUser._id, res);

    // Respond with user details
    return res.status(200).json({
      _id: foundUser._id,
      name: foundUser.name,
      email: foundUser.email,
      username: foundUser.username,
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
    console.log('Error in loginUser: ', error.message);
  }
};
export default { signupUser, loginUser };
