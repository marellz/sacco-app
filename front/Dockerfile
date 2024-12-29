# Base Image
FROM node:18-alpine

ARG UID=1000
ARG GID=1000

USER ${UID}:${GID}

WORKDIR /usr/src/app

COPY --chown=${UID}:${GID} package*.json ./

RUN npm install

COPY --chown=${UID}:${GID} . .

RUN npm run build

EXPOSE 3000

CMD [ "npm", "run", "dev", "--","--host" ]


# CMD [ "node", ".output/server/index.mjs" ]
# FROM nginx:stable-alpine as production-stage
# COPY --from=build-stage /app/dist /usr/share/nginx/html
# CMD [ "nginx", "-g", "daemon off;" ]