FROM node:18-alpine3.17 AS build

WORKDIR /app

COPY package.json /app/package.json

RUN npm install 

COPY . /app
RUN npm run build

FROM nginx

COPY nginx.conf /etc/nginx/conf.d/default.conf

COPY --from=build /app/dist /usr/share/nginx/html


# docker build -t abddssh/advblog-frontend .
# docker push abddssh/advblog-frontend:latest
