# FROM node:latest

# WORKDIR ./star-recognition

# COPY ./src/app .src/app

# RUN npm install -g @angular/cli

# RUN npm install 

# CMD ["ng", "serve", "--host", "0.0.0.0"]

FROM node:12

WORKDIR /usr/src/app

COPY . /usr/src/app

RUN npm install -g @angular/cli@12

RUN npm install

# Expose the port that ng serve will run on
EXPOSE 4200

# Command to run the Angular application
CMD ["ng", "serve", "--host", "0.0.0.0", "--disable-host-check"]