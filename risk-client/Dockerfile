FROM node:alpine3.18 as build

RUN apk add --no-cache git

# set working directory
WORKDIR /app

# add `/app/node_modules/.bin` to $PATH
ENV PATH /app/node_modules/.bin:$PATH

ARG api_base_url="https://localhost:44328/"
ARG base_url="base_url"

RUN echo "Using $api_base_url and $base_url"

# install app dependencies
COPY package.json ./
RUN npm cache clean --force 
RUN rm -rf node_modules || true
RUN rm -f package-lock.json || true
RUN npm install 
#RUN apk add --update nodejs npm
RUN apk add --no-cache git
COPY . ./
RUN ./set_environment.sh $api_base_url $base_url
RUN npm run build

# production env
FROM nginx:stable-alpine
WORKDIR /app
COPY --from=build /app/nginx.conf /etc/nginx/nginx.conf
COPY --from=build /app/dist /usr/share/nginx/html
EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]