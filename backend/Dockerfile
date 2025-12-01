# 1. Use the official Node.js 18 image as our base
FROM node:18

# 2. Set the working directory inside the container
WORKDIR /app

# 3. Copy package.json first to leverage Docker caching
COPY package.json .

# 4. Install dependencies
RUN npm install

# 5. Copy the rest of the application code
COPY . .

# 6. Expose the port the app runs on
EXPOSE 5000

# 7. Command to run the application
CMD ["node", "server.js"]