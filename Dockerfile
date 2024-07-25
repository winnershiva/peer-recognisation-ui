FROM node:latest

WORKDIR ./star-recognition

COPY ./src/app .src/app

RUN npm install -g @angular/cli

RUN npm install 

CMD ["ng", "serve", "--host", "0.0.0.0"]