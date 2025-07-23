FROM node:18-alpine3.17 as build

WORKDIR /app

COPY package.json /app/package.json

RUN npm install 

COPY . /app
RUN npm run build

FROM nginx:alpine

COPY nginx.conf /etc/nginx/sites-enabled/default

COPY --from=build /app/dist /usr/share/nginx/html
