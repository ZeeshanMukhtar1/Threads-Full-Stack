// Import necessary modules
import { Server } from 'socket.io';
import http from 'http';
import express from 'express';

// Create an instance of an Express application
const app = express();

// Create a new HTTP server and pass the Express application to it
const server = http.createServer(app);

// Create a new Socket.IO server and attach it to the HTTP server
// The cors option is used to enable Cross-Origin Resource Sharing (CORS) with the specified options
const io = new Server(server, {
  cors: {
    origin: 'http://localhost:3000', // Specify the origin to which the server can accept requests
    methods: ['GET', 'POST'], // Specify the methods that are allowed when making a request
  },
});

const userSocketMap = {};

// Listen for a connection event for incoming sockets
// When a client connects, log a message with the socket's ID
io.on('connection', (socket) => {
  console.info('user is connected', socket.id);

  const userId = socket.handshake.query.userId;

  if (userId != undefined) userSocketMap[userId] = socket.id;

  io.emit('getOnlineUsers', Object.keys(userSocketMap));

  socket.on('disconnect', () => {
    console.info('user is disconnected', socket.id);

    delete userSocketMap[userId];
    io.emit('getOnlineUsers', Object.keys(userSocketMap));
  });
});

// Export the Socket.IO server, HTTP server, and Express application for use in other modules
export { io, server, app };
