FROM node:20-alpine AS builder

ENV TZ=America/New_York

WORKDIR /app

COPY package.json package-lock.json ./
RUN npm ci  # Ensures a clean install based on package-lock.json

COPY . .

ARG ENV=dev:remote # Set env dev remote by default
RUN npm run build:$ENV  # Use the ENV argument to set build mode

FROM nginx:1.23-alpine

WORKDIR /usr/share/nginx/html

RUN rm -rf ./*

COPY --from=builder /app/dist ./ 

COPY nginx.conf.template /etc/nginx/templates/nginx.conf.template

CMD envsubst '$API_GATEWAY' < /etc/nginx/templates/nginx.conf.template > /etc/nginx/nginx.conf && nginx -g 'daemon off;'

EXPOSE 80
