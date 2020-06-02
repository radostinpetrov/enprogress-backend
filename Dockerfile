FROM node:current 
 
RUN mkdir /app 
WORKDIR /app 
 
COPY package.json 
COPY package-lock.json 
 
RUN apt-get -y update && apt-get -y install npm 
 
COPY . . 
 
CMD node app.js

