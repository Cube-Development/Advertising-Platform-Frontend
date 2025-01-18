# Указываем build-аргументы
ARG VITE_BASE_URL
ARG VITE_BASE_WS_URL
ARG VITE_APP_ENV

# Первая стадия сборки: использование Node.js для установки зависимостей и сборки проекта
FROM node:18-alpine3.17 as build

# Устанавливаем переменные окружения из build-аргументов
ENV VITE_BASE_URL=$VITE_BASE_URL
ENV VITE_BASE_WS_URL=$VITE_BASE_WS_URL
ENV VITE_APP_ENV=$VITE_APP_ENV

WORKDIR /app
COPY . /app

RUN npm install
RUN npm run build

# Вторая стадия сборки: использование Ubuntu с Nginx для обслуживания статического контента
FROM ubuntu:latest

RUN apt-get update
RUN apt-get install -y nginx

# Копируем конфигурацию nginx
COPY nginx.conf /etc/nginx/sites-enabled/default

# Копируем собранные файлы из первой стадии сборки
COPY --from=build /app/dist /var/www/html

# Открываем порт для веб-сервера
EXPOSE 80

# Запускаем Nginx
CMD ["nginx", "-g", "daemon off;"]
