FROM node:16.13-alpine AS builder
WORKDIR /builddir
COPY package.json package-lock.json /builddir/
RUN npm install
COPY . /builddir/
RUN npm run build

FROM nginx:alpine
ENV NGINX_ENVSUBST_TEMPLATE_DIR=/usr/share/nginx/html
ENV NGINX_ENVSUBST_OUTPUT_DIR=/usr/share/nginx/html
COPY --from=builder /builddir/build/ /usr/share/nginx/html
COPY docker/settings.js.template /usr/share/nginx/html/
COPY docker/default.conf /etc/nginx/conf.d
