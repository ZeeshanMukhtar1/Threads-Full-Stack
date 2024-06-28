# Threads Clone 🧵

## Introduction

Threads Clone is a social media platform with an integrated chat feature, designed for seamless user interactions. Users can sign up, create text posts, attach images, and engage in real-time conversations. The platform includes features like post replies, likes, user profiles, follow/unfollow functionality, and account management options such as updating user profiles and freezing accounts. The application is fully mobile-responsive, supports dark and light themes, and provides a user-friendly experience.

## Features

### Platform Core 🌐

- **Sign up and login**: Users can easily create accounts and log in.
- **Secure authentication**: Passwords are hashed for secure user authentication.
- **Robust Validation**: Robust validation for user input on both the client and server sides.
- **sponsored posts to fresh users**: Sponsored posts for fresh users to get them started.
- **fetch similar users while searching**: Fetch similar users while searching for users.
- **Responsive design**: The platform is fully mobile-responsive for a seamless user experience.
- **404 page**: Custom 404 page for handling invalid routes.
- **Error handling**: Informative error messages for a user-friendly experience.
- **Loading spinners**: Visual loading spinners for a smooth user experience.
- **Toast notifications**: Informative toast notifications for user actions.
- **Dark and light themes**: Choose between dark and light themes for a personalized experience.
- **Logout functionality**: Securely log out of the platform.
- **Real-time updates**: Stay informed with real-time updates for new posts and replies.

### User Interaction Features ✨

- **Create and view posts**: Users can create text posts and view posts from others.
- **Attach images**: Users can enhance their posts by attaching images.
- **Report improper posts**: Users can report posts that violate community guidelines or relgious content.
- **Engage with posts**: Like and reply to posts similar to tweets.
- **Profile interactions**: Visit user profiles, follow/unfollow, and update user information.
- **Account management**: Freeze/unfreeze accounts and update account information.
- **Suggested users**: Get recommendations for users to follow.
- **Delete posts**: Users can remove their own posts.
- **Copy post Url to clipboard**: Users can copy post Url to clipboard.
- **Share post to other platforms**: Users can share posts to other platforms.

### AI Integration 🤖

- **Generate Post with Gemini**: Users can generate posts with Gemini.
- **Proper Rate Limiting**: Proper rate limiting for Gemini API to avoid abuse.
- **Reply with AI**: Users can reply to posts with AI.
- **IP adress tracking**: Proper IP address tracking for Gemini API to avoid abuse.

### Chat Feature 💬

- **Send text and images**: Users can communicate with each other using text and images.
- **Online user status**: Know when users are online.
- **Notification tones**: Receive notification tones for new messages when the chat is out of focus.
- **Read receipts**: Check if a message has been seen by the recipient.

### Optimization Features 🚀

- **Efficient Loading**: Visual loading spinners and lazy loading for images to enhance performance.
- **Rate Limiting**: Proper rate limiting for Gemini API to avoid abuse. (5 POSTS PER HOUR)
- **tracing User actions**: Proper states for components to avoid unnecessary re-renders and Api calls to backend.

## Technologies Used 🚀

- **React**: Building user interfaces with ease.
- **Node.js**: Server-side JavaScript runtime.
- **Express.js**: Web application framework for Node.js.
- **MongoDB**: Document database for storing application data.
- **Mongoose**: MongoDB object modeling tool for Node.js.
- **JWT**: JSON Web Token for secure user authentication.
- **Bcrypt**: Password hashing for secure user authentication.
- **Gemini**: AI model for generating text replies and posts.
- **Socket.IO**: Real-time communication for a responsive chat experience.
- **Chakra UI**: UI component library for React applications.
- **Cloudinary**: Cloud-based image and video management platform.
- **rate-limiter-flexible**: Rate limiting for Gemini API to avoid abuse.
- **sass**: CSS preprocessor for styling.
- **recoil**: State management library for React applications.

## Screenshots / Preview 📸

![Login Page](./client/public/loginPage.png)
![Profile Page](./client/public/updateProfile.png)
![404 Page](./client/public/404.png)
![post Page](./client/public/post.png)
![settngs Page](./client/public/settings.png)
![suggestions Page](./client/public/suggestedUser.png)
![chat Page](./client/public/chat.png)

## Acknowledgements

- **Developer:** Zeeshan Mukhtar
  - LinkedIn: [Zeeshan Mukhtar](https://www.linkedin.com/in/zeeshanmukhtar1/)

This project is a follow-along tutorial inspired by the [As a Programmer](https://www.youtube.com/playlist?list=PLNEhktk_WNzr2sgIyas0DDcUFRrmSe42Q) tutorial. Special thanks to `burakorkmez` for providing valuable learning resources and guidance.

## Contributing 🤝

Contributions, issues, and feature requests are welcome! Please feel free to open an issue or create a pull request.

## License 📜

Threads Clone is open source and distributed under the [MIT License](LICENSE). Feel free to use, modify, and distribute the source code as per the terms of the license.
