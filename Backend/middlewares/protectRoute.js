import jwt from 'jsonwebtoken';
import User from '../models/userModel.js';

const protectRoute = async (req, res, next) => {
  try {
    // Get the token from the request header
    const token = req.cookies.jwt;
    if (!token) {
      return res.status(401).json({ message: 'Not authorized, no token' });
    }
    // Verify the token
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    // Find the user in the database
    const user = await User.findById(decoded.userId).select('-password');
    if (!user) {
      return res.status(404).json({ message: 'No user found' });
    }
    // Set the user object on the request object
    req.user = user;
    // Attach the user object to the request object
    // Call the next middleware
    next();
  } catch (error) {
    console.log('Error in protectRoute: ', error.message);
    res.status(401).json({ message: 'Not authorized, token failed' });
  }
};

export default protectRoute;
