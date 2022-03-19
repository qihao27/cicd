FROM node:16

# Create app directory
WORKDIR /tmp

# Install app dependencies
COPY package*.json ./

RUN npm install

# Bundle app source
COPY . .

EXPOSE 8080
CMD [ "node", "main.js" ]