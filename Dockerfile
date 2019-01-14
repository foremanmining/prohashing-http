# Base image
FROM node:8

# Application directory
WORKDIR /app

# Install dependencies
COPY package.json /app
RUN npm install

# Copy sources
COPY . /app

# Environment variables
ENV SERVER_HOST 'localhost'
ENV SERVER_PORT 8081
ENV PROHASHING_API_KEY

# Run
CMD node app.js
EXPOSE ${SERVER_PORT}
