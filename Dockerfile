# build environment
FROM node:14.17.5-alpine as build
WORKDIR /app
ENV PATH /app/node_modules/.bin:$PATH
COPY package.json /app/package.json
RUN apk add --no-cache git
RUN npm install --production
COPY . /app

# set baseurl to get connected with backend API
ARG SERVER_URL=http://localhost:9000/

ENV REACT_APP_SERVER_URL=$SERVER_URL

RUN npm run build --if-present

# host environment
FROM nginx:1.16.0-alpine
COPY --from=build /app/build /usr/share/nginx/html
RUN rm /etc/nginx/conf.d/default.conf
COPY nginx/nginx.conf /etc/nginx/conf.d
EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]
