FROM node:16-alpine as build-stage

WORKDIR /app

COPY ./package.json .

RUN npm install --silent
RUN npm install react-scripts -g --silent

COPY . .

RUN npm run build


# production enviroment
FROM nginx:stable-alpine

COPY --from=build-stage /app/build /usr/share/nginx/html

EXPOSE 80

