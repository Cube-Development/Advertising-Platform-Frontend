# Первая стадия сборки: использование Node.js для установки зависимостей и сборки проекта
FROM node:18-alpine3.17 as build

# Устанавливаем рабочую директорию
WORKDIR /app

# Копируем файлы проекта
COPY . /app

# Копируем файл .env в контейнер
# .env должен быть создан в GitHub Actions
COPY .env /app/.env

# Загружаем переменные из .env
RUN export $(cat .env | xargs) && \
    echo "VITE_BASE_URL=$VITE_BASE_URL" && \
    echo "VITE_BASE_WS_URL=$VITE_BASE_WS_URL" && \
    echo "VITE_APP_ENV=$VITE_APP_ENV" && \
    npm install && \
    npm run build

# Вторая стадия сборки: использование Ubuntu с Nginx для обслуживания статического контента
FROM ubuntu:latest

# Устанавливаем Nginx
RUN apt-get update && apt-get install -y nginx

# Копируем конфигурацию nginx
COPY nginx.conf /etc/nginx/sites-enabled/default

# Копируем собранные файлы из первой стадии сборки
COPY --from=build /app/dist /var/www/html

# Открываем порт для веб-сервера
EXPOSE 80

# Запускаем Nginx
CMD ["nginx", "-g", "daemon off;"]
