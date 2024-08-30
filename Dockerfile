FROM node:20

#create app directory , this is in our container/ in our image
WORKDIR /usr/src/app


# A wildcard is used to ensure both package.json AND package-lock.json are copied
COPY package*.json ./

# Install app dependencies
RUN npm install

# Bundle app source
COPY . .

# Creates a "dist" folder with the production build
RUN npm run build

EXPOSE 3000
CMD [ "node", "dist/main" ]