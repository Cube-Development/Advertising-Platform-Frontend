FROM node:18-alpine3.17 AS build

WORKDIR /app

# Ставим строго по package-lock.json.
#
# Раньше копировался только package.json и запускался `npm install` — то есть
# дерево зависимостей резолвилось из реестра заново на каждой сборке, а
# закоммиченный локфайл игнорировался. Сборка зависела от текущего состояния
# npm-реестра и однажды упала на ровном месте:
#   npm ERR! Cannot read properties of null (reading 'edgesOut')
# при неизменном package.json. `npm ci` ставит ровно то, что записано в
# локфайле: воспроизводимо и заметно быстрее.
COPY package.json package-lock.json /app/

RUN npm ci

# Получаем build args
ARG VITE_BASE_URL
ARG VITE_BASE_WS_URL
ARG VITE_BASE_DIDOX_URL
ARG VITE_BASE_DIDOX_URL_2
ARG VITE_PUBLIC_OFFER_FILE_URL
ARG VITE_SERVICE_RULES_FILE_URL

# Устанавливаем переменные окружения для сборки
ENV VITE_BASE_URL=$VITE_BASE_URL
ENV VITE_BASE_WS_URL=$VITE_BASE_WS_URL
ENV VITE_BASE_DIDOX_URL=$VITE_BASE_DIDOX_URL
ENV VITE_BASE_DIDOX_URL_2=$VITE_BASE_DIDOX_URL_2
ENV VITE_PUBLIC_OFFER_FILE_URL=$VITE_PUBLIC_OFFER_FILE_URL
ENV VITE_SERVICE_RULES_FILE_URL=$VITE_SERVICE_RULES_FILE_URL

COPY . /app
RUN npm run build

FROM nginx

COPY nginx.conf /etc/nginx/conf.d/default.conf

COPY --from=build /app/dist /usr/share/nginx/html

# docker build -t abddssh/advblog-frontend .
# docker push abddssh/advblog-frontend:latest