import mongoose from 'mongoose';

// Define the structure of the user schema
const userSchema = mongoose.Schema(
  {
    // User's full name
    name: {
      type: String,
      required: true, // This field is required
    },

    // Unique username for the user
    username: {
      type: String,
      required: true, // This field is required
      unique: true, // Username must be unique
    },

    // Unique email address for the user
    email: {
      type: String,
      required: true, // This field is required
      unique: true, // Email must be unique
    },

    // Password for the user (with minimum length of 6 characters)
    password: {
      type: String,
      minLength: 6, // Minimum length of 6 characters
      required: true, // This field is required
    },

    // URL to the user's profile picture, default is an empty string
    profilepic: {
      type: String,
      default: '',
    },

    // List of user IDs who are followers of this user, default is an empty array
    followers: {
      type: [String], // Array of user IDs
      default: [],
    },

    // List of user IDs who are followed by this user, default is an empty array
    following: {
      type: [String], // Array of user IDs
      default: [],
    },

    // User's biography, default is an empty string
    bio: {
      type: String,
      default: '',
    },
    isFrozen: {
      type: Boolean,
      default: false,
    },
  },

  {
    // Enable timestamps to automatically track createdAt and updatedAt
    timestamps: true,
  }
);

// Create a User model from the userSchema
const User = mongoose.model('User', userSchema);

export default User;
