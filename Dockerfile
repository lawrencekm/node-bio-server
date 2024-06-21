# Dockerfile
FROM node:14

# Create app directory
WORKDIR /usr/src/app

# Install app dependencies
COPY package*.json ./

RUN npm install

# Bundle app source
COPY . .

# Bind to port 3000
EXPOSE 3008

# Define environment variable
ENV PORT=3008

# Start the app
CMD [ "node", "app.js" ]
