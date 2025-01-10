# Base Image
FROM node:18.20.5

WORKDIR /app

COPY package.json .

RUN npm install

COPY . .

# RUN npm run build

RUN chmod +x .nuxt node_modules -f
RUN chown node:node .nuxt node_modules -f

EXPOSE 3000
EXPOSE 24678


CMD [ "npm", "run", "dev", "--","--host" ]

# CMD [ "node", ".output/server/index.mjs" ]
# FROM nginx:stable-alpine as production-stage
# COPY --from=build-stage /app/dist /usr/share/nginx/html
# CMD [ "nginx", "-g", "daemon off;" ]