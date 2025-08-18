FROM node:18-alpine3.17 AS build

WORKDIR /app

COPY package.json /app/package.json

RUN npm install 

# Получаем build args
ARG VITE_BASE_URL
ARG VITE_BASE_WS_URL
ARG VITE_BASE_DIDOX_URL

# Устанавливаем переменные окружения для сборки
ENV VITE_BASE_URL=$VITE_BASE_URL
ENV VITE_BASE_WS_URL=$VITE_BASE_WS_URL
ENV VITE_BASE_DIDOX_URL=$VITE_BASE_DIDOX_URL

COPY . /app
RUN npm run build

FROM nginx

COPY nginx.conf /etc/nginx/conf.d/default.conf

COPY --from=build /app/dist /usr/share/nginx/html

# docker build -t abddssh/advblog-frontend .
# docker push abddssh/advblog-frontend:latest