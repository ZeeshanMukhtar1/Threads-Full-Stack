# Use the latest Node.js LTS version for the server
FROM node:20 AS server

# Set the working directory in the container
WORKDIR /usr/src/app

# Copy package.json and package-lock.json to the working directory
COPY package*.json ./

# Install server dependencies
RUN npm install

# Copy the rest of the server code to the working directory
COPY . .

# Expose the port the server runs on
EXPOSE 5000

# Command to run the server in development mode using nodemon
CMD ["npm", "run", "dev"]
