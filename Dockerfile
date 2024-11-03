# FROM node:latest AS builder

# WORKDIR /app

# RUN npm install -g pnpm
# RUN git clone https://github.com/AlfaIV/gnss-radar.git
# WORKDIR /app/gnss-radar
# RUN git fetch
# RUN git switch readPage
# RUN pnpm install
# RUN pnpm run build

FROM nginx:latest

# COPY --from=builder /app/gnss-radar/dist /usr/share/nginx/html
# COPY --from=builder /app/gnss-radar/nginx.conf /etc/nginx/conf.d/default.conf
COPY ./dist /usr/share/nginx/html
COPY nginx.conf /etc/nginx/conf.d/default.conf

EXPOSE 80

CMD ["nginx", "-g", "daemon off;"]