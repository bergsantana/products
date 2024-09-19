FROM node:18.16.1 as development

WORKDIR /usr/src/app

RUN npm install -g @nestjs/cli

COPY ./package*.json ./ 


# RUN ls -la
RUN npm i

COPY . . 
 
COPY .env .env


EXPOSE ${BACKEND_PORT}



CMD ["ls", "-la"]