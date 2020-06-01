FROM node:current
COPY ./app.js ./
RUN apt-get -y update && apt-get -y install nodejs
CMD [ "node", "app.js" ]

