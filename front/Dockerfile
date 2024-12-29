FROM node:lts

WORKDIR /app

COPY package.json /app

RUN npm install

COPY . /app

EXPOSE 3000

CMD [ "npm", "run", "dev", "--","--host" ]

# CMD [ "node", ".output/server/index.mjs" ]
# FROM nginx:stable-alpine as production-stage
# COPY --from=build-stage /app/dist /usr/share/nginx/html
# CMD [ "nginx", "-g", "daemon off;" ]