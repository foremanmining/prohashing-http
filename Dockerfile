# Base image
FROM node:11.6

# Application directory
WORKDIR /app

# Install dependencies
COPY package*.json /app/
RUN npm install

# Copy sources
COPY . /app/

# Environment variables
ENV SERVER_HOST 'localhost'
ENV SERVER_PORT 8081
ENV PROHASHING_API_KEY 'undefined'

# Health check
HEALTHCHECK --interval=60s --timeout=5s --start-period=30s \
 CMD node healthcheck.js

# Run
CMD node app.js
EXPOSE ${SERVER_PORT}
