# Use official Node.js base image
FROM node:18

# Set working directory in the container
WORKDIR /app

# Copy package files
COPY package*.json ./


RUN npm install

# Copy all app files
COPY . .


EXPOSE 3060
CMD ["node", "main.js"]