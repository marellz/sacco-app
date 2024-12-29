# Base Image
FROM node:18-alpine

ARG UID=1000
ARG GID=1000

USER ${UID}:${GID}

WORKDIR /app

COPY --chown=${UID}:${GID} package*.json /app

RUN npm install

COPY --chown=${UID}:${GID} . /app

CMD ["npm", "run", "dev"]
