# Use the latest Node.js LTS version for the client build stage
FROM node:20 AS client

# Set the working directory in the container
WORKDIR /usr/src/app

# Copy package.json and package-lock.json to the working directory
COPY package*.json ./

# Install client dependencies
RUN npm install

# Copy the rest of the client code to the working directory
COPY . .

# Build the client
RUN npm run build

# Use a second stage to serve the client
FROM nginx:alpine
COPY --from=client /usr/src/app/dist /usr/share/nginx/html

# Expose the port the client runs on
EXPOSE 80

# Command to run Nginx
CMD ["nginx", "-g", "daemon off;"]
