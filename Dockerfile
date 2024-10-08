# build environment
FROM node:14.19.0-alpine3.15 as build
WORKDIR /app
ENV PATH /app/node_modules/.bin:$PATH
COPY package.json /app/package.json
RUN apk update && apk upgrade && \
    apk add --no-cache bash git openssh

# Install dependencies with legacy peer deps
RUN npm install --silent --legacy-peer-deps

COPY . /app

RUN npm run build --if-present

# host environment
FROM nginx:1.25.1-alpine

# Update and upgrade Alpine packages
RUN apk update && apk upgrade

COPY --from=build /app/build /usr/share/nginx/html
RUN rm /etc/nginx/conf.d/default.conf
COPY nginx/nginx.conf /etc/nginx/nginx.conf

# Create necessary directories and set permissions
RUN mkdir -p /tmp/nginx /var/cache/nginx /var/run /var/log/nginx && \
    chown -R 10014:10014 /tmp/nginx /var/cache/nginx /var/run /var/log/nginx /usr/share/nginx/html && \
    chmod -R 755 /tmp/nginx /var/cache/nginx /var/run /var/log/nginx /usr/share/nginx/html

# Create a non-root user
RUN adduser -D -u 10014 choreouser

# Switch to the non-root user
USER 10014

EXPOSE 8080

CMD ["nginx", "-g", "daemon off;"]
