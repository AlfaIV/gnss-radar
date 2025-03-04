FROM node:20 AS build

WORKDIR /app

COPY package*.json ./

RUN npm ci

COPY . .

RUN npm run build

FROM nginx:alpine

COPY --from=build /app/build /build

COPY nginx.conf /etc/nginx/nginx.conf

COPY default.conf /etc/nginx/conf.d/default.conf

RUN mkdir -p /var/tmp/proxy_cache

EXPOSE 80

CMD ["nginx", "-g", "daemon off;"]