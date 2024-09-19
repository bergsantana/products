# --- BASE BUILD TARGET ---

    FROM node:18-alpine as development

    RUN npm install -g serve
    
    WORKDIR /app
    
    COPY ./package*.json .
    

    
    RUN npm install --force
    
    COPY . .
    

    ENV NODE_ENV 'development'

    COPY ./.env.development ./.env

    RUN npm run build-only
