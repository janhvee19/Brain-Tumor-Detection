FROM node:18-bullseye
RUN apt-get update && apt-get install -y python3 python3-pip
RUN pip3 install tensorflow numpy pillow flask-cors --break-system-packages
WORKDIR /app
COPY package*.json ./
RUN npm install
COPY . .
EXPOSE 5002
CMD ["node", "server.js"]