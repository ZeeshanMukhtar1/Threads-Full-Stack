import mongoose from "mongoose";

// Define the structure of a Post document in MongoDB
const postSchema = mongoose.Schema(
  {
    // Reference to the user who posted this post
    postedBy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User", // Refers to the 'User' model
      required: true,
    },

    // The text content of the post (up to 500 characters)
    text: {
      type: String,
      maxLength: 500,
    },

    // The URL of an image associated with the post (optional)
    image: {
      type: String,
    },

    // Number of likes for the post, default is 0
    likes: {
      // array of user ids
      type: [mongoose.Schema.Types.ObjectId],
      ref: "User",
      default: [],
    },

    // Array of replies to the post
    replies: [
      {
        userId: {
          type: mongoose.Schema.Types.ObjectId,
          ref: "User",
          required: true,
        },
        text: {
          type: String,
          required: true,
        },
        profilepic: {
          type: String,
          required: false,
        },
        username: {
          type: String,
          required: false,
        },
      },
    ],
  },

  {
    // Enable timestamps, which automatically adds 'createdAt' and 'updatedAt' fields
    timestamps: true,
  }
);

// Create a 'Post' model from the schema
const Post = mongoose.model("Post", postSchema);

export default Post;
