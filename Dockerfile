FROM node:lts-alpine3.20
WORKDIR /app
COPY package*.json ./
RUN npm install
COPY . .
# EXPOSE 5173
EXPOSE 3000 
CMD ["npm", "run", "dev", "--", "--host", "0.0.0.0", "--port", "3000"]