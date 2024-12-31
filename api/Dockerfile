# Base Image
FROM node:18-alpine

ARG UID=1000
ARG GID=1000

USER ${UID}:${GID}

WORKDIR /usr/src/app

COPY --chown=${UID}:${GID} package*.json ./

RUN npm install

COPY --chown=${UID}:${GID} . .

EXPOSE 3000

CMD ["npm", "run", "dev"]
